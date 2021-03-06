#include "download_helper_script_object.h"

#ifdef OS_LINUX
#include <unistd.h>
#include <wait.h>
#include <dlfcn.h>
#include <gtk/gtk.h>

#include <zmq.hpp>

#elif defined OS_WIN
#include <comdef.h>

#include "com_object_wapper.h"
#include "internet_download_manager.h"
#elif defined OS_MAC
#include "mac_downloader_script_object.h"
#endif

#include <stdlib.h>
#include <string.h>

#include "downloader_script_object.h"
#include "log.h"
#include "script_object_factory.h"
#include "utils.h"

extern Log g_logger;

std::string DownloadHelperScriptObject::download_path_ = "";

NPObject* DownloadHelperScriptObject::Allocate(NPP npp, NPClass *aClass) {
  DownloadHelperScriptObject* script_object = new DownloadHelperScriptObject;
  char logs[256];
  sprintf(logs, "DownloadHelperScriptObject ");
  g_logger.WriteLog("Allocate",logs);
  if (script_object != NULL) {
    script_object->set_plugin((PluginBase*)npp->pdata);
  }  

  return script_object;
}

void DownloadHelperScriptObject::Deallocate() {
  char logs[256];
  sprintf(logs, "DownloadHelperScriptObject ");
  g_logger.WriteLog("Deallocate",logs);
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
  item.function_name = "CopyToClipboard";
  item.function_pointer = ON_INVOKEHELPER(&DownloadHelperScriptObject::
      CopyToClipboard);
  AddFunction(item);
  item.function_name = "OpenDownloadPath";
  item.function_pointer = ON_INVOKEHELPER(&DownloadHelperScriptObject::
      OpenDownloadPath);
  AddFunction(item);
  item.function_name = "OpenDownloadFilePath";
  item.function_pointer = ON_INVOKEHELPER(&DownloadHelperScriptObject::
      OpenDownloadFilePath);
  AddFunction(item);
  item.function_name = "SetDownloadPath";
  item.function_pointer = ON_INVOKEHELPER(&DownloadHelperScriptObject::
      SetDownloadPath);
  AddFunction(item);
  item.function_name = "UpdateDownloadPath";
  item.function_pointer = ON_INVOKEHELPER(&DownloadHelperScriptObject::
      UpdateDownloadPath);
  AddFunction(item);
  item.function_name = "GetDefaultDownloadPath";
  item.function_pointer = ON_INVOKEHELPER(&DownloadHelperScriptObject::
      GetDefaultDownloadPath);
  AddFunction(item);
  item.function_name = "test";
  item.function_pointer = ON_INVOKEHELPER(&DownloadHelperScriptObject::
      test);
  AddFunction(item);

  item.function_name = "push2Client";
  item.function_pointer = ON_INVOKEHELPER(&DownloadHelperScriptObject::
      push2Client);
  AddFunction(item);

  item.function_name = "phantom";
  item.function_pointer = ON_INVOKEHELPER(&DownloadHelperScriptObject::
      phantom);
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
  if (prog_id == "DownlWithIDM.LinkProcessor") {
    DownloaderScriptObject* pObject =
        (DownloaderScriptObject*)ScriptObjectFactory::
        CreateObject(get_plugin()->get_npp(),
                     InternetDownloadManager::Allocate);
    OBJECT_TO_NPVARIANT(pObject, *result);
    return true;
  }

  utils::Utf8ToUnicode progID(prog_id.c_str());
  IDispatch* pInterface;
  CLSID clsid;
  HRESULT hr = CLSIDFromProgID(progID, &clsid);
  TCHAR* pClssID;
  StringFromCLSID(clsid, &pClssID);
  _bstr_t bstr(pClssID);
  g_logger.WriteLog("CLSIDFromProgID", bstr);
  if (SUCCEEDED(hr)) {
    hr = CoCreateInstance(clsid, NULL, CLSCTX_SERVER, IID_IDispatch,
        (LPVOID*)&pInterface);
    g_logger.WriteLog("CreateObject", "CoCreateInstance");
    if (SUCCEEDED(hr)) {
      ComObjectWapper* pObject = (ComObjectWapper*)ScriptObjectFactory::
          CreateObject(get_plugin()->get_npp(), ComObjectWapper::Allocate);
      OBJECT_TO_NPVARIANT(pObject, *result);
      pObject->disp_pointer_ = pInterface;
      sprintf(logs, "pInterface=0x%X,pObject=%ld", pInterface, pObject);
      g_logger.WriteLog("CreateObject", logs);
    } else {
      sprintf(logs, "GetLastError=%ld,hr=0x%X", GetLastError(), hr);
      g_logger.WriteLog("Error", logs);
    }
  }
#elif defined OS_LINUX
  DownloaderScriptObject* pObject = (DownloaderScriptObject*)
      ScriptObjectFactory::CreateObject(get_plugin()->get_npp(),
      DownloaderScriptObject::Allocate);
  OBJECT_TO_NPVARIANT(pObject, *result);
  if (pObject)
    pObject->set_execute_file(prog_id.c_str());
#elif defined OS_MAC
  MacDownloaderScriptObject* script_object = (MacDownloaderScriptObject*)
      ScriptObjectFactory::CreateObject(get_plugin()->get_npp(),
                                        MacDownloaderScriptObject::Allocate);
  OBJECT_TO_NPVARIANT(script_object, *result);
  if (script_object) {
    std::string command = "osascript -e \"tell app \\\"Finder\\\" ";
    command += "to get app id \\\"";
    command += prog_id;
    command += "\\\"\"";
    FILE* p = popen(command.c_str(), "r");
    if (p != NULL) {
      char echo_contents[MAX_BUFFER] = "";
      int count = fread(echo_contents, 1, MAX_BUFFER, p);
      if (count > 0)
        echo_contents[count] = 0;
      for (int index = 0; index < strlen(echo_contents); index++) {
        if (echo_contents[index] == '\n') {
          echo_contents[index] = 0;
          break;
        }            
      }
      g_logger.WriteLog("App", echo_contents);
      if (strlen(echo_contents) && strstr(echo_contents, "error") == NULL) {
        script_object->set_app_name(echo_contents);
      }
      pclose(p);
    }
  }
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
  if (prog_id == "DownlWithIDM.LinkProcessor") {
    BOOLEAN_TO_NPVARIANT(InternetDownloadManager::CheckObject(), *result);
    return true;
  }

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
#elif defined OS_MAC
	std::string command = "osascript -e \"tell app \\\"Finder\\\" ";
  command += "to get app id \\\"";
  command += prog_id;
  command += "\\\"\"";
  FILE* p = popen(command.c_str(), "r");
  if (p != NULL) {
    char echo_contents[MAX_BUFFER] = "";
    int count = fread(echo_contents, 1, MAX_BUFFER, p);
    if (count > 0) 
      echo_contents[count] = 0;
    if (strlen(echo_contents) && strstr(echo_contents, "error") == NULL)
      BOOLEAN_TO_NPVARIANT(true, *result);
    pclose(p);
  }
#endif
  return true;
}

bool DownloadHelperScriptObject::CopyToClipboard(const NPVariant* args,
                                                 uint32_t argCount,
                                                 NPVariant* result) {
  return true;
}

bool DownloadHelperScriptObject::OpenDownloadPath(const NPVariant* args,
                                                  uint32_t argCount,
                                                  NPVariant* result) {
  if (argCount != 1 || !NPVARIANT_IS_STRING(args[0]))
    return false;

#ifdef OS_LINUX
  std::string path(NPVARIANT_TO_STRING(args[0]).UTF8Characters,
                   NPVARIANT_TO_STRING(args[0]).UTF8Length);

  if (fork() == 0) {
    execlp("xdg-open", "xdg-open", path.c_str(), NULL);
    execlp("gnome-open", "gnome-open", path.c_str(), NULL);
    exit(1);
  }
#endif
  
  return true;
}

bool DownloadHelperScriptObject::OpenDownloadFilePath(const NPVariant* args,
                                                      uint32_t argCount,
                                                      NPVariant* result) {
  if (argCount != 1 || !NPVARIANT_IS_STRING(args[0]))
    return false;

#ifdef OS_LINUX
  std::string path(NPVARIANT_TO_STRING(args[0]).UTF8Characters,
                   NPVARIANT_TO_STRING(args[0]).UTF8Length);

  if (fork() == 0) {
    execlp("xdg-open", "xdg-open", path.c_str(), NULL);
    execlp("gnome-open", "gnome-open", path.c_str(), NULL);
    exit(1);
  }
#endif

  return true;
}

bool DownloadHelperScriptObject::SetDownloadPath(const NPVariant* args,
                                                 uint32_t argCount,
                                                 NPVariant* result) {
#ifdef OS_LINUX
  if (argCount < 1)
    return false;
  for (int index = 0; index < argCount; index++)
    if (!NPVARIANT_IS_STRING(args[index]))
      return false;

  std::string path;
  std::string title(NPVARIANT_TO_STRING(args[0]).UTF8Characters,
                    NPVARIANT_TO_STRING(args[0]).UTF8Length);
  if (argCount == 2)
    path.append(NPVARIANT_TO_STRING(args[1]).UTF8Characters,
                NPVARIANT_TO_STRING(args[1]).UTF8Length);

  GtkWidget *dialog = gtk_file_chooser_dialog_new(
      title.c_str(), NULL,
      GTK_FILE_CHOOSER_ACTION_SELECT_FOLDER,
      GTK_STOCK_CANCEL, GTK_RESPONSE_CANCEL,
      GTK_STOCK_OPEN, GTK_RESPONSE_ACCEPT, NULL);
  gtk_window_set_position(GTK_WINDOW(dialog), GTK_WIN_POS_CENTER);
  gtk_file_chooser_set_current_folder(GTK_FILE_CHOOSER(dialog), path.c_str());
  gtk_window_set_keep_above(GTK_WINDOW(dialog), TRUE);
  
  char* ret_value = NULL;
  if (gtk_dialog_run(GTK_DIALOG(dialog)) == GTK_RESPONSE_ACCEPT) {
    char* folder = gtk_file_chooser_get_filename(GTK_FILE_CHOOSER(dialog));
    if (folder) {
      int len = strlen(folder);
      ret_value = (char*)NPN_MemAlloc(len + 1);
      memcpy(ret_value, folder, len);
      ret_value[len] = 0;
    }
    g_free(folder);
  } else {
    int len = path.length();
    ret_value = (char*)NPN_MemAlloc(len + 1);
    memcpy(ret_value, path.c_str(), len);
    ret_value[len] = 0;
  }
  gtk_widget_destroy(dialog);
  if (ret_value) {
    download_path_ = ret_value;
    STRINGZ_TO_NPVARIANT(ret_value, *result);
  }
#endif
  
  return true;
}

bool DownloadHelperScriptObject::UpdateDownloadPath(const NPVariant* args,
                                                    uint32_t argCount,
                                                    NPVariant* result) {
  if (argCount != 1 || !NPVARIANT_IS_STRING(args[0]))
    return false;

  download_path_.clear();
  download_path_.append(NPVARIANT_TO_STRING(args[0]).UTF8Characters,
                        NPVARIANT_TO_STRING(args[0]).UTF8Length);
  
  return true;
}

bool DownloadHelperScriptObject::GetDefaultDownloadPath(const NPVariant* args,
                                                        uint32_t argCount,
                                                        NPVariant* result) {
#ifdef OS_LINUX
  const char* path = g_get_user_special_dir(G_USER_DIRECTORY_DOWNLOAD);
  if (path == NULL)
    path = g_get_home_dir();
  int length = strlen(path);
  char* copy = (char *)NPN_MemAlloc(length + 1);
  memcpy(copy, path, length);
  copy[length] = 0;
  STRINGN_TO_NPVARIANT(copy, length, *result);
#else
  char* copy = (char*)NPN_MemAlloc(download_path_.length() + 1);
  strcpy(copy, download_path_.c_str());
  STRINGZ_TO_NPVARIANT(copy, *result);
#endif
  
  return true;
}

bool DownloadHelperScriptObject::test(const NPVariant* args,
                                                        uint32_t argCount,
                                                        NPVariant* result) {
#ifdef OS_LINUX
  if (argCount < 1)
    return false;
  for (int index = 0; index < argCount; index++)
    if (!NPVARIANT_IS_STRING(args[index]))
      return false;

  std::string tmp(NPVARIANT_TO_STRING(args[0]).UTF8Characters,
                    NPVARIANT_TO_STRING(args[0]).UTF8Length);
                    
  int length = tmp.length();
  
  char* copy = (char *)NPN_MemAlloc(length + 1);
  memcpy(copy, tmp.c_str(), length);
  copy[length] = 0;
  STRINGN_TO_NPVARIANT(copy, length, *result);
    
#endif
  
  return true;
}

bool DownloadHelperScriptObject::push2Client(const NPVariant *args, uint32_t argCount,
                              NPVariant *result)
{
#ifdef OS_LINUX
  if (argCount < 2)
    return false;
  for (int index = 0; index < argCount; index++)
    if (!NPVARIANT_IS_STRING(args[index]))
      return false;

  std::string arg0(NPVARIANT_TO_STRING(args[0]).UTF8Characters,
                    NPVARIANT_TO_STRING(args[0]).UTF8Length);
  std::string arg1(NPVARIANT_TO_STRING(args[1]).UTF8Characters);
                    
  int length = arg0.length();
  
  char* copy = (char *)NPN_MemAlloc(length + 1);
  memcpy(copy, arg0.c_str(), length);
  copy[length] = 0;
  STRINGN_TO_NPVARIANT(copy, length, *result);

  std::string port("tcp://*:"+arg1);

  zmq::context_t context (1);
  //  Socket to send messages on
  zmq::socket_t  sender(context, ZMQ_PUSH);
  sender.bind(port.c_str());
  
  zmq::message_t message(length);
  memcpy(message.data(), copy, length);
  sender.send(message);
  sleep (1);

/*
  if(m_context == NULL && m_socket == NULL)
  {
	m_context = NULL;
    m_context = new zmq::context_t(1);
  
    m_socket = NULL;
    m_socket = new zmq::socket_t(*m_context, ZMQ_PUSH);
    m_socket->bind("tcp://*:5555");
  }
  
  zmq::message_t message(length);
  memcpy(message.data(), copy, length);
  if(m_socket != NULL)
  {
    m_socket->send(message);
  	sleep (1);
  }
  if(m_context != NULL)
  {
	delete m_context;
	m_context = NULL;
  }
  if(m_socket != NULL)
  {
	delete m_socket;
	m_socket = NULL;
  }
*/
#endif
  
  return true;
}

//http://zhuoqiang.me/a/how-program-find-themsel
std::string get_module_path(void* address=NULL)
{
    if (! address) {
        address = (void*)(&get_module_path);
    }
 

#ifdef OS_WIN  
  
	HMODULE handle = NULL;
    BOOL const ret = ::GetModuleHandleExW(
        GET_MODULE_HANDLE_EX_FLAG_FROM_ADDRESS,
        //|GET_MODULE_HANDLE_EX_FLAG_UNCHANGED_REFCOUNT,
        static_cast<wchar_t*>(address),
        &handle);
 
    if (ret != 0 && handle != NULL) {            
        wchar_t path_buffer[MAX_PATH] = {L'\0'}; 
        DWORD const ret = ::GetModuleFileNameW(handle, path_buffer, MAX_PATH);
        // We have to free it
        ::FreeLibrary(handle);
        if (0 != ret) {
			_bstr_t t = path_buffer;
		    char* pchar = (char*)t;
		    std::string result = pchar;
            return result;
        }
    }

#elif defined OS_LINUX

    ::Dl_info dl_info;
    dl_info.dli_fname = 0;
    int const ret = ::dladdr(address, &dl_info);
    if (0 != ret && dl_info.dli_fname != NULL) {
        return dl_info.dli_fname;
    }    
#endif
	return "";
}


bool DownloadHelperScriptObject::phantom(const NPVariant *args, uint32_t argCount,
                              NPVariant *result)
{
  if (argCount < 2)
    return false;
  for (int index = 0; index < argCount; index++)
    if (!NPVARIANT_IS_STRING(args[index]))
      return false;

  std::string tmp(NPVARIANT_TO_STRING(args[0]).UTF8Characters,
                    NPVARIANT_TO_STRING(args[0]).UTF8Length);  


  std::string tmp2(NPVARIANT_TO_STRING(args[1]).UTF8Characters,
                    NPVARIANT_TO_STRING(args[1]).UTF8Length);  

  int length2 = tmp2.length();

  std::string path = get_module_path();  


#ifdef OS_WIN

  tmp += ".exe";

  path = path.substr(0,path.find_last_of('\\'));
  path = path.substr(0,path.find_last_of('\\'));

  utils::Utf8ToUnicode buffer(path.c_str());

  SetCurrentDirectory(buffer);

  //�滻ת����
  while(true)   {     
	  std::string::size_type   pos(0);     
    if(   (pos=tmp.find("/"))!=std::string::npos   )     
        tmp.replace(pos,1,"\\");     
    else   break;     
  }
  /*
char* copy = (char*)NPN_MemAlloc(path.length() + 1);
  strcpy(copy, tmp.c_str());
  STRINGZ_TO_NPVARIANT(copy, *result);return true;*/

  utils::Utf8ToUnicode strOpt("open");
  utils::Utf8ToUnicode strUpfile(tmp.c_str());
  utils::Utf8ToUnicode strParam(tmp2.c_str());
  if(ShellExecute(NULL,strOpt,strUpfile,strParam,NULL,SW_HIDE))
  {
	  BOOLEAN_TO_NPVARIANT(true, *result);
  }/*
  delete buffer;
  delete strUpfile;
  delete strParam;*/
#elif defined OS_LINUX
  path = path.substr(0,path.find_last_of('/'));
  path = path.substr(0,path.find_last_of('/'));

  int chdir_return_value = chdir(path.c_str());
  
  tmp = tmp + " " + tmp2;

  int length = tmp.length();

  char* copy = (char *)NPN_MemAlloc(length + 1);
  memcpy(copy, tmp.c_str(), length);
  copy[length] = 0;


  FILE* p = popen(copy, "r");
  if (p != NULL) {
  /*
    char* echo_contents = (char *)NPN_MemAlloc(MAX_BUFFER);
    int count = fread(echo_contents, 1, MAX_BUFFER, p);
    if (count > 0) {
      echo_contents[count] = 0;
    }    
    pclose(p);
    STRINGN_TO_NPVARIANT(echo_contents, count, *result);*/
    BOOLEAN_TO_NPVARIANT(true, *result);
  }
#endif
  
  return true;
}
