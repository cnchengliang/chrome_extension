#Don't forget Tab button.
#Format:
#target ...:	prerequisites ...
#command ...	

objects=download_helper.so

download_helper.so:	dll_entry.cc download_helper_plugin.cc download_helper_script_object.cc log.cc \
  	npn_entry.cc npp_entry.cc plugin_base.cc plugin_factory.cc script_object_base.cc script_object_factory.cc
	@echo compiling ...
	gcc  -O2 -Xlinker -I/usr/include/gtk-2.0 -I/usr/lib/gtk-2.0/include -I/usr/include/atk-1.0 -I/usr/include/cairo -I/usr/include/pango-1.0 -I/usr/include/gio-unix-2.0/ -I/usr/include/pixman-1 -I/usr/include/freetype2 -I/usr/include/directfb -I/usr/include/libpng12 -I/usr/include/glib-2.0 -I/usr/lib/glib-2.0/include  -pthread -lgtk-x11-2.0 -lgdk-x11-2.0 -latk-1.0 -lpangoft2-1.0 -lgdk_pixbuf-2.0 -lm -lpangocairo-1.0 -lcairo -lgio-2.0 -lpango-1.0 -lfreetype -lfontconfig -lgobject-2.0 -lgmodule-2.0 -lgthread-2.0 -lrt -lglib-2.0 -Wall -shared -o	$(objects)

clean:	rm	$(objects)

