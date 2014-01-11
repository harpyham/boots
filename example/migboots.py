#!/usr/bin/env python

import sys
F=open(sys.argv[1],"r")
M={"container-fluid":"container",
    "row-fluid":"row",
    "span(\S*)":"col-md-",
    "offset(\S*)":"col-md-offset-",
    "brand":"navbar-brand",
    "navbar\s+nav":"nav navbar-nav",
    "hero-unit":"jumbotron",
    "icon-(\S*)":"glyphicon glyphicon-",
    "btn":"btn btn-default",
    "btn-mini":"btn-xs",
    "btn-small":"btn-sm",
    "btn-large":"btn-lg",
    "visible-phone":"visible-sm",
    "visible-tablet":"visible-md",
    "visible-desktop":"visible-lg",
    "hidden-phone":"hidden-sm",
    "hidden-tablet":"hidden-md",
    "hidden-desktop":"hidden-lg",
    "input-prepend":"input-group",
    "input-append":"input-group",
    "add-on":"input-group-addon",
    "btn-navbar":"navbar-btn",
    "thumbnail":"img-thumbnail"}
   
import re

for lie in F:
    #m=re.match('class=[\'|"](.*)[\'|"]',lie)
    lm=re.match('(.*\s+class=")([^\'"]*)("[\s|>]?.*)',lie)
    zclass=""
    if lm :
        zclass = lm.group(2)
        #print zclass
    else:
        print lie,
        continue
    replace=""
    for zc in zclass.split(" "):
        findm=False
        for k,v in M.items():
            m=re.match('.*\s?'+k+'\s?',zc)
            if m:
                findm=True
                if len(replace) > 0:
                    replace+=" "
                if len(m.groups('')) > 0:
                    #print "%s -> %s%s" % ( m.group(0) ,v,m.group(1) )
                    replace+=v
                    replace+=m.group(1)
                else:
                    #print "%s -> %s" % ( m.group(0) ,v)
                    replace+=v
                break
        if not findm:
            if len(replace) > 0:
                replace+=" "
            replace+=zc
    print "%s%s%s" %(lm.group(1),replace,lm.group(3))


F.close()
