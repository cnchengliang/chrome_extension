#!/bin/sh
if [ "$1" = "debug" ]; then
  FLAG=-g
else
  FLAG="-O2 -Xlinker --strip-all"
fi

gcc $FLAG -DOS_LINUX -m32 -fPIC -Wno-write-strings `pkg-config --cflags --libs gtk+-2.0` -lzmq \
  -shared -o simple_plugin.so dll_entry.cc download_helper_plugin.cc download_helper_script_object.cc log.cc \
  npn_entry.cc npp_entry.cc plugin_base.cc plugin_factory.cc script_object_base.cc script_object_factory.cc \
  downloader_script_object.cc

