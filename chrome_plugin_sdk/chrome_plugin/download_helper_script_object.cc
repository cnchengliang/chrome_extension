#include "download_helper_script_object.h"

#ifdef OS_LINUX
#include <unistd.h>
#include <wait.h>

#include <gtk/gtk.h>

#elif defined OS_WIN
#include <comdef.h>
#endif

#include <stdlib.h>
#include <string.h>

#include "log.h"
#include "script_object_factory.h"
#include "utils.h"

extern Log g_logger;

std::string DownloadHelperScriptObject::download_path_ = "C:\\Log";

NPObject* DownloadHelperScriptObject::Allocate(NPP npp, NPClass *aClass) {
  DownloadHelperScriptObject* script_object = new DownloadHelperScriptObject;
  char logs[256];
  //sprintf(logs, "DownloadHelperScriptObject this=%ld", script_object);
  //g_logger.WriteLog("Allocate",logs);
  if (script_object != NULL) {
    script_object->set_plugin((PluginBase*)npp->pdata);
  }
  return script_object;
}

void DownloadHelperScriptObject::Deallocate() {
  char logs[256];
  //sprintf(logs, "DownloadHelperScriptObject this=%ld", this);
  //g_logger.WriteLog("Deallocate",logs);
  delete this;
}

void DownloadHelperScriptObject::InitHandler() {
  FunctionItem item;
  item.function_name = "CreateObject";
  item.function_pointer = ON_INVOKEHELPER(&DownloadHelperScriptObject::
      CreateObject);
  AddFunction(item);
  item.function_name = "CheckObject";
  item.function_pointer = ON_INVOKEHELPER(&DownloadHelperScriptObject::
      CheckObject);
  AddFunction(item);
}

bool DownloadHelperScriptObject::CreateObject(const NPVariant* args,
                                              uint32_t argCount,
                                              NPVariant* result) {
  char logs[256];
  NULL_TO_NPVARIANT(*result);
  if (argCount != 1 || !NPVARIANT_IS_STRING(args[0]))
    return false;

  std::string prog_id(NPVARIANT_TO_STRING(args[0]).UTF8Characters,
                      NPVARIANT_TO_STRING(args[0]).UTF8Length);
  g_logger.WriteLog("ProgID", prog_id.c_str());

#ifdef OS_WIN

  char* copy = (char*)NPN_MemAlloc(download_path_.length() + 1);
  strcpy(copy, download_path_.c_str());
  STRINGZ_TO_NPVARIANT(copy, *result);
  

#elif defined OS_LINUX
  const char* path = g_get_user_special_dir(G_USER_DIRECTORY_DOWNLOAD);
  if (path == NULL)
    path = g_get_home_dir();
  int length = strlen(path);
  char* copy = (char *)NPN_MemAlloc(length + 1);
  memcpy(copy, path, length);
  copy[length] = 0;
  STRINGN_TO_NPVARIANT(copy, length, *result);
/*
  DownloaderScriptObject* pObject = (DownloaderScriptObject*)
      ScriptObjectFactory::CreateObject(get_plugin()->get_npp(),
      DownloaderScriptObject::Allocate);
  OBJECT_TO_NPVARIANT(pObject, *result);
  if (pObject)
    pObject->set_execute_file(prog_id.c_str());
*/
#endif
  
  return true;
}


bool DownloadHelperScriptObject::CheckObject(const NPVariant* args,
                                             uint32_t argCount,
                                             NPVariant* result) {
  BOOLEAN_TO_NPVARIANT(false, *result);
  if (argCount != 1 || !NPVARIANT_IS_STRING(args[0]))
    return false;

  std::string prog_id(NPVARIANT_TO_STRING(args[0]).UTF8Characters,
                      NPVARIANT_TO_STRING(args[0]).UTF8Length);
  g_logger.WriteLog("ProgID", prog_id.c_str());
#ifdef OS_WIN

  utils::Utf8ToUnicode wchar_prog_id(prog_id.c_str());
  CLSID clsid;
  HRESULT hr = CLSIDFromProgID(wchar_prog_id, &clsid);
  TCHAR* pClssID;
  StringFromCLSID(clsid, &pClssID);
  _bstr_t bstr(pClssID);
  g_logger.WriteLog("CLSIDFromProgID", bstr);
  if (SUCCEEDED(hr)) {
    BOOLEAN_TO_NPVARIANT(true, *result);
  }
#elif defined OS_LINUX
  std::string command = "which ";
  command += prog_id;
  FILE* p = popen(command.c_str(), "r");
  if (p != NULL) {
    char echo_contents[MAX_BUFFER] = "";
    int count = fread(echo_contents, 1, MAX_BUFFER, p);
    if (count > 0) {
      echo_contents[count] = 0;
    }
    if (strstr(echo_contents, prog_id.c_str()) != NULL)
      BOOLEAN_TO_NPVARIANT(true, *result);
    pclose(p);
  }

#endif
  return true;
}
