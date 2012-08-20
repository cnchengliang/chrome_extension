#include "log.h"

#ifndef OS_WIN
#include <unistd.h>
#include <time.h>
#include <sys/time.h>
#endif

Log::Log(void) {
  file_ = NULL;
}

Log::~Log(void) {
  if (file_ != NULL)
    CloseLog();
}

bool Log::OpenLog(const char* header) {
  if (file_ != NULL)
    return false;

#ifdef OS_WIN
  char filename[MAX_PATH];
  GetLocalTime(&time_);
  sprintf_s(filename, "C:\\Log\\%s_%d%02d%02d_%d.log",
            header, time_.wYear, time_.wMonth, time_.wDay,
            GetCurrentProcessId());
#else
  char filename[260];
  time_t nowtime = time(NULL);
  struct tm* time_ = localtime(&nowtime);
  sprintf(filename, "/log/%s_%d%02d%02d_%d.log",
          header, time_->tm_year+1900, time_->tm_mon, time_->tm_mday,
          getpid());
#endif
  file_ = fopen(filename, "a");
  if (file_ == NULL)
    return false;
  else
    return true;
}

bool Log::WriteLog(const char* title, const char* contents) {
  if (file_ == NULL) {
    return false;
  }

#ifdef OS_WIN
  GetLocalTime(&time_);
  if (1) {
#else
  timeval nowtime;
  gettimeofday(&nowtime, NULL);
  struct tm* time_ = localtime(&nowtime.tv_sec);
  if (1) {
#endif
    fflush(file_);
    return true;
  } else
    return false;
}

bool Log::CloseLog() {
  if (file_ != NULL) {
    fclose(file_);
    file_ = NULL;
  }
  return true;
}
