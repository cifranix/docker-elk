var __kbnBundles__=typeof __kbnBundles__==="object"?__kbnBundles__:{};__kbnBundles__["plugin/licenseManagement"]=function(modules){function webpackJsonpCallback(data){var chunkIds=data[0];var moreModules=data[1];var moduleId,chunkId,i=0,resolves=[];for(;i<chunkIds.length;i++){chunkId=chunkIds[i];if(Object.prototype.hasOwnProperty.call(installedChunks,chunkId)&&installedChunks[chunkId]){resolves.push(installedChunks[chunkId][0])}installedChunks[chunkId]=0}for(moduleId in moreModules){if(Object.prototype.hasOwnProperty.call(moreModules,moduleId)){modules[moduleId]=moreModules[moduleId]}}if(parentJsonpFunction)parentJsonpFunction(data);while(resolves.length){resolves.shift()()}}var installedModules={};var installedChunks={0:0};function jsonpScriptSrc(chunkId){return __webpack_require__.p+""+({}[chunkId]||chunkId)+".plugin.js"}function __webpack_require__(moduleId){if(installedModules[moduleId]){return installedModules[moduleId].exports}var module=installedModules[moduleId]={i:moduleId,l:false,exports:{}};modules[moduleId].call(module.exports,module,module.exports,__webpack_require__);module.l=true;return module.exports}__webpack_require__.e=function requireEnsure(chunkId){var promises=[];var installedChunkData=installedChunks[chunkId];if(installedChunkData!==0){if(installedChunkData){promises.push(installedChunkData[2])}else{var promise=new Promise((function(resolve,reject){installedChunkData=installedChunks[chunkId]=[resolve,reject]}));promises.push(installedChunkData[2]=promise);var script=document.createElement("script");var onScriptComplete;script.charset="utf-8";script.timeout=120;if(__webpack_require__.nc){script.setAttribute("nonce",__webpack_require__.nc)}script.src=jsonpScriptSrc(chunkId);var error=new Error;onScriptComplete=function(event){script.onerror=script.onload=null;clearTimeout(timeout);var chunk=installedChunks[chunkId];if(chunk!==0){if(chunk){var errorType=event&&(event.type==="load"?"missing":event.type);var realSrc=event&&event.target&&event.target.src;error.message="Loading chunk "+chunkId+" failed.\n("+errorType+": "+realSrc+")";error.name="ChunkLoadError";error.type=errorType;error.request=realSrc;chunk[1](error)}installedChunks[chunkId]=undefined}};var timeout=setTimeout((function(){onScriptComplete({type:"timeout",target:script})}),12e4);script.onerror=script.onload=onScriptComplete;document.head.appendChild(script)}}return Promise.all(promises)};__webpack_require__.m=modules;__webpack_require__.c=installedModules;__webpack_require__.d=function(exports,name,getter){if(!__webpack_require__.o(exports,name)){Object.defineProperty(exports,name,{enumerable:true,get:getter})}};__webpack_require__.r=function(exports){if(typeof Symbol!=="undefined"&&Symbol.toStringTag){Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"})}Object.defineProperty(exports,"__esModule",{value:true})};__webpack_require__.t=function(value,mode){if(mode&1)value=__webpack_require__(value);if(mode&8)return value;if(mode&4&&typeof value==="object"&&value&&value.__esModule)return value;var ns=Object.create(null);__webpack_require__.r(ns);Object.defineProperty(ns,"default",{enumerable:true,value:value});if(mode&2&&typeof value!="string")for(var key in value)__webpack_require__.d(ns,key,function(key){return value[key]}.bind(null,key));return ns};__webpack_require__.n=function(module){var getter=module&&module.__esModule?function getDefault(){return module["default"]}:function getModuleExports(){return module};__webpack_require__.d(getter,"a",getter);return getter};__webpack_require__.o=function(object,property){return Object.prototype.hasOwnProperty.call(object,property)};__webpack_require__.p="__REPLACE_WITH_PUBLIC_PATH__";__webpack_require__.oe=function(err){console.error(err);throw err};var jsonpArray=window["licenseManagement_bundle_jsonpfunction"]=window["licenseManagement_bundle_jsonpfunction"]||[];var oldJsonpFunction=jsonpArray.push.bind(jsonpArray);jsonpArray.push=webpackJsonpCallback;jsonpArray=jsonpArray.slice();for(var i=0;i<jsonpArray.length;i++)webpackJsonpCallback(jsonpArray[i]);var parentJsonpFunction=oldJsonpFunction;return __webpack_require__(__webpack_require__.s=4)}([function(module,exports){module.exports=__kbnSharedDeps__.KbnI18n},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});Object.defineProperty(exports,"PLUGIN",{enumerable:true,get:function get(){return _plugin.PLUGIN}});Object.defineProperty(exports,"BASE_PATH",{enumerable:true,get:function get(){return _base_path.BASE_PATH}});Object.defineProperty(exports,"API_BASE_PATH",{enumerable:true,get:function get(){return _base_path.API_BASE_PATH}});Object.defineProperty(exports,"EXTERNAL_LINKS",{enumerable:true,get:function get(){return _external_links.EXTERNAL_LINKS}});Object.defineProperty(exports,"APP_PERMISSION",{enumerable:true,get:function get(){return _permissions.APP_PERMISSION}});var _plugin=__webpack_require__(7);var _base_path=__webpack_require__(8);var _external_links=__webpack_require__(9);var _permissions=__webpack_require__(10)},function(module,exports,__webpack_require__){"use strict";var isOldIE=function isOldIE(){var memo;return function memorize(){if(typeof memo==="undefined"){memo=Boolean(window&&document&&document.all&&!window.atob)}return memo}}();var getTarget=function getTarget(){var memo={};return function memorize(target){if(typeof memo[target]==="undefined"){var styleTarget=document.querySelector(target);if(window.HTMLIFrameElement&&styleTarget instanceof window.HTMLIFrameElement){try{styleTarget=styleTarget.contentDocument.head}catch(e){styleTarget=null}}memo[target]=styleTarget}return memo[target]}}();var stylesInDom=[];function getIndexByIdentifier(identifier){var result=-1;for(var i=0;i<stylesInDom.length;i++){if(stylesInDom[i].identifier===identifier){result=i;break}}return result}function modulesToDom(list,options){var idCountMap={};var identifiers=[];for(var i=0;i<list.length;i++){var item=list[i];var id=options.base?item[0]+options.base:item[0];var count=idCountMap[id]||0;var identifier="".concat(id," ").concat(count);idCountMap[id]=count+1;var index=getIndexByIdentifier(identifier);var obj={css:item[1],media:item[2],sourceMap:item[3]};if(index!==-1){stylesInDom[index].references++;stylesInDom[index].updater(obj)}else{stylesInDom.push({identifier:identifier,updater:addStyle(obj,options),references:1})}identifiers.push(identifier)}return identifiers}function insertStyleElement(options){var style=document.createElement("style");var attributes=options.attributes||{};if(typeof attributes.nonce==="undefined"){var nonce=true?__webpack_require__.nc:undefined;if(nonce){attributes.nonce=nonce}}Object.keys(attributes).forEach((function(key){style.setAttribute(key,attributes[key])}));if(typeof options.insert==="function"){options.insert(style)}else{var target=getTarget(options.insert||"head");if(!target){throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.")}target.appendChild(style)}return style}function removeStyleElement(style){if(style.parentNode===null){return false}style.parentNode.removeChild(style)}var replaceText=function replaceText(){var textStore=[];return function replace(index,replacement){textStore[index]=replacement;return textStore.filter(Boolean).join("\n")}}();function applyToSingletonTag(style,index,remove,obj){var css=remove?"":obj.media?"@media ".concat(obj.media," {").concat(obj.css,"}"):obj.css;if(style.styleSheet){style.styleSheet.cssText=replaceText(index,css)}else{var cssNode=document.createTextNode(css);var childNodes=style.childNodes;if(childNodes[index]){style.removeChild(childNodes[index])}if(childNodes.length){style.insertBefore(cssNode,childNodes[index])}else{style.appendChild(cssNode)}}}function applyToTag(style,options,obj){var css=obj.css;var media=obj.media;var sourceMap=obj.sourceMap;if(media){style.setAttribute("media",media)}else{style.removeAttribute("media")}if(sourceMap&&btoa){css+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))))," */")}if(style.styleSheet){style.styleSheet.cssText=css}else{while(style.firstChild){style.removeChild(style.firstChild)}style.appendChild(document.createTextNode(css))}}var singleton=null;var singletonCounter=0;function addStyle(obj,options){var style;var update;var remove;if(options.singleton){var styleIndex=singletonCounter++;style=singleton||(singleton=insertStyleElement(options));update=applyToSingletonTag.bind(null,style,styleIndex,false);remove=applyToSingletonTag.bind(null,style,styleIndex,true)}else{style=insertStyleElement(options);update=applyToTag.bind(null,style,options);remove=function remove(){removeStyleElement(style)}}update(obj);return function updateStyle(newObj){if(newObj){if(newObj.css===obj.css&&newObj.media===obj.media&&newObj.sourceMap===obj.sourceMap){return}update(obj=newObj)}else{remove()}}}module.exports=function(list,options){options=options||{};if(!options.singleton&&typeof options.singleton!=="boolean"){options.singleton=isOldIE()}list=list||[];var lastIdentifiers=modulesToDom(list,options);return function update(newList){newList=newList||[];if(Object.prototype.toString.call(newList)!=="[object Array]"){return}for(var i=0;i<lastIdentifiers.length;i++){var identifier=lastIdentifiers[i];var index=getIndexByIdentifier(identifier);stylesInDom[index].references--}var newLastIdentifiers=modulesToDom(newList,options);for(var _i=0;_i<lastIdentifiers.length;_i++){var _identifier=lastIdentifiers[_i];var _index=getIndexByIdentifier(_identifier);if(stylesInDom[_index].references===0){stylesInDom[_index].updater();stylesInDom.splice(_index,1)}}lastIdentifiers=newLastIdentifiers}}},function(module,exports,__webpack_require__){"use strict";module.exports=function(useSourceMap){var list=[];list.toString=function toString(){return this.map((function(item){var content=cssWithMappingToString(item,useSourceMap);if(item[2]){return"@media ".concat(item[2]," {").concat(content,"}")}return content})).join("")};list.i=function(modules,mediaQuery,dedupe){if(typeof modules==="string"){modules=[[null,modules,""]]}var alreadyImportedModules={};if(dedupe){for(var i=0;i<this.length;i++){var id=this[i][0];if(id!=null){alreadyImportedModules[id]=true}}}for(var _i=0;_i<modules.length;_i++){var item=[].concat(modules[_i]);if(dedupe&&alreadyImportedModules[item[0]]){continue}if(mediaQuery){if(!item[2]){item[2]=mediaQuery}else{item[2]="".concat(mediaQuery," and ").concat(item[2])}}list.push(item)}};return list};function cssWithMappingToString(item,useSourceMap){var content=item[1]||"";var cssMapping=item[3];if(!cssMapping){return content}if(useSourceMap&&typeof btoa==="function"){var sourceMapping=toComment(cssMapping);var sourceURLs=cssMapping.sources.map((function(source){return"/*# sourceURL=".concat(cssMapping.sourceRoot||"").concat(source," */")}));return[content].concat(sourceURLs).concat([sourceMapping]).join("\n")}return[content].join("\n")}function toComment(sourceMap){var base64=btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));var data="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);return"/*# ".concat(data," */")}},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});Object.defineProperty(exports,"LicenseManagementUIPluginSetup",{enumerable:true,get:function get(){return _plugin.LicenseManagementUIPluginSetup}});Object.defineProperty(exports,"LicenseManagementUIPluginStart",{enumerable:true,get:function get(){return _plugin.LicenseManagementUIPluginStart}});exports.plugin=void 0;var _plugin=__webpack_require__(5);__webpack_require__(12);var plugin=function plugin(ctx){return new _plugin.LicenseManagementUIPlugin(ctx)};exports.plugin=plugin},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.LicenseManagementUIPlugin=void 0;var _operators=__webpack_require__(6);var _constants=__webpack_require__(1);var _breadcrumbs=__webpack_require__(11);function _slicedToArray(arr,i){return _arrayWithHoles(arr)||_iterableToArrayLimit(arr,i)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function _iterableToArrayLimit(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break}}catch(err){_d=true;_e=err}finally{try{if(!_n&&_i["return"]!=null)_i["return"]()}finally{if(_d)throw _e}}return _arr}function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}function asyncGeneratorStep(gen,resolve,reject,_next,_throw,key,arg){try{var info=gen[key](arg);var value=info.value}catch(error){reject(error);return}if(info.done){resolve(value)}else{Promise.resolve(value).then(_next,_throw)}}function _asyncToGenerator(fn){return function(){var self=this,args=arguments;return new Promise((function(resolve,reject){var gen=fn.apply(self,args);function _next(value){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"next",value)}function _throw(err){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"throw",err)}_next(undefined)}))}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}var LicenseManagementUIPlugin=function(){function LicenseManagementUIPlugin(initializerContext){_classCallCheck(this,LicenseManagementUIPlugin);this.initializerContext=initializerContext;_defineProperty(this,"breadcrumbService",new _breadcrumbs.BreadcrumbService)}_createClass(LicenseManagementUIPlugin,[{key:"setup",value:function setup(coreSetup,plugins){var _this=this;var config=this.initializerContext.config.get();if(!config.ui.enabled){return{enabled:false}}var getStartServices=coreSetup.getStartServices;var management=plugins.management,telemetry=plugins.telemetry,licensing=plugins.licensing;management.sections.getSection("elasticsearch").registerApp({id:_constants.PLUGIN.id,title:_constants.PLUGIN.title,order:99,mount:function(){var _mount=_asyncToGenerator(regeneratorRuntime.mark((function _callee(_ref){var element,setBreadcrumbs,_ref2,_ref3,core,initialLicense,docLinks,ELASTIC_WEBSITE_URL,DOC_LINK_VERSION,esBase,appDocLinks,appDependencies,_ref4,renderApp;return regeneratorRuntime.wrap((function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:element=_ref.element,setBreadcrumbs=_ref.setBreadcrumbs;_context.next=3;return getStartServices();case 3:_ref2=_context.sent;_ref3=_slicedToArray(_ref2,1);core=_ref3[0];_context.next=8;return plugins.licensing.license$.pipe((0,_operators.first)()).toPromise();case 8:initialLicense=_context.sent;docLinks=core.docLinks;ELASTIC_WEBSITE_URL=docLinks.ELASTIC_WEBSITE_URL,DOC_LINK_VERSION=docLinks.DOC_LINK_VERSION;esBase="".concat(ELASTIC_WEBSITE_URL,"guide/en/elasticsearch/reference/").concat(DOC_LINK_VERSION);appDocLinks={security:"".concat(esBase,"/security-settings.html")};_this.breadcrumbService.setup(setBreadcrumbs);appDependencies={core:core,config:config,plugins:{licensing:licensing,telemetry:telemetry},services:{breadcrumbService:_this.breadcrumbService},store:{initialLicense:initialLicense},docLinks:appDocLinks};_context.next=17;return Promise.all([__webpack_require__.e(1),__webpack_require__.e(2)]).then(__webpack_require__.t.bind(null,23,7));case 17:_ref4=_context.sent;renderApp=_ref4.renderApp;return _context.abrupt("return",renderApp(element,appDependencies));case 20:case"end":return _context.stop()}}}),_callee)})));function mount(_x){return _mount.apply(this,arguments)}return mount}()});return{enabled:true}}},{key:"start",value:function start(){}},{key:"stop",value:function stop(){}}]);return LicenseManagementUIPlugin}();exports.LicenseManagementUIPlugin=LicenseManagementUIPlugin},function(module,exports){module.exports=__kbnSharedDeps__.RxjsOperators},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.PLUGIN=void 0;var _i18n=__webpack_require__(0);var PLUGIN={title:_i18n.i18n.translate("xpack.licenseMgmt.managementSectionDisplayName",{defaultMessage:"License Management"}),id:"license_management"};exports.PLUGIN=PLUGIN},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.API_BASE_PATH=exports.BASE_PATH=void 0;var BASE_PATH="/management/elasticsearch/license_management/";exports.BASE_PATH=BASE_PATH;var API_BASE_PATH="/api/license";exports.API_BASE_PATH=API_BASE_PATH},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.EXTERNAL_LINKS=void 0;var ELASTIC_BASE_URL="https://www.elastic.co/";var EXTERNAL_LINKS={SUBSCRIPTIONS:"".concat(ELASTIC_BASE_URL,"subscriptions"),TRIAL_EXTENSION:"".concat(ELASTIC_BASE_URL,"trialextension"),TRIAL_LICENSE:"".concat(ELASTIC_BASE_URL,"legal/trial_license")};exports.EXTERNAL_LINKS=EXTERNAL_LINKS},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.APP_PERMISSION=void 0;var APP_PERMISSION="cluster:manage";exports.APP_PERMISSION=APP_PERMISSION},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.BreadcrumbService=void 0;var _i18n=__webpack_require__(0);var _constants=__webpack_require__(1);function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}));keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(source,true).forEach((function(key){_defineProperty(target,key,source[key])}))}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source))}else{ownKeys(source).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}}return target}function _toConsumableArray(arr){return _arrayWithoutHoles(arr)||_iterableToArray(arr)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function _iterableToArray(iter){if(Symbol.iterator in Object(iter)||Object.prototype.toString.call(iter)==="[object Arguments]")return Array.from(iter)}function _arrayWithoutHoles(arr){if(Array.isArray(arr)){for(var i=0,arr2=new Array(arr.length);i<arr.length;i++){arr2[i]=arr[i]}return arr2}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}var BreadcrumbService=function(){function BreadcrumbService(){_classCallCheck(this,BreadcrumbService);_defineProperty(this,"breadcrumbs",{dashboard:[],upload:[]});_defineProperty(this,"setBreadcrumbsHandler",void 0)}_createClass(BreadcrumbService,[{key:"setup",value:function setup(setBreadcrumbsHandler){this.setBreadcrumbsHandler=setBreadcrumbsHandler;this.breadcrumbs.dashboard=[{text:_i18n.i18n.translate("xpack.licenseMgmt.dashboard.breadcrumb",{defaultMessage:"License management"}),href:"#".concat(_constants.BASE_PATH,"home")}];this.breadcrumbs.upload=[].concat(_toConsumableArray(this.breadcrumbs.dashboard),[{text:_i18n.i18n.translate("xpack.licenseMgmt.upload.breadcrumb",{defaultMessage:"Upload"})}])}},{key:"setBreadcrumbs",value:function setBreadcrumbs(type){if(!this.setBreadcrumbsHandler){throw new Error("BreadcrumbService#setup() must be called first!")}var newBreadcrumbs=this.breadcrumbs[type]?_toConsumableArray(this.breadcrumbs[type]):_toConsumableArray(this.breadcrumbs.home);var lastBreadcrumb=newBreadcrumbs.pop();newBreadcrumbs.push(_objectSpread({},lastBreadcrumb,{href:undefined}));this.setBreadcrumbsHandler(newBreadcrumbs)}}]);return BreadcrumbService}();exports.BreadcrumbService=BreadcrumbService},function(module,exports,__webpack_require__){if(window.__kbnDarkMode__){__webpack_require__(13)}else{__webpack_require__(15)}},function(module,exports,__webpack_require__){var api=__webpack_require__(2);var content=__webpack_require__(14);content=content.__esModule?content.default:content;if(typeof content==="string"){content=[[module.i,content,""]]}var options={};options.insert="head";options.singleton=false;var update=api(content,options);var exported=content.locals?content.locals:{};module.exports=exported},function(module,exports,__webpack_require__){var ___CSS_LOADER_API_IMPORT___=__webpack_require__(3);exports=___CSS_LOADER_API_IMPORT___(false);exports.push([module.i,".licFeature {\n  -webkit-box-flex: 1;\n  -webkit-flex-grow: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1; }\n\n.licManagement__modal {\n  width: 70vw; }\n\n.licManagement__narrowText {\n  width: 240px; }\n\n.licManagement__ieFlex {\n  -webkit-flex-shrink: 0;\n      -ms-flex-negative: 0;\n          flex-shrink: 0; }\n",""]);module.exports=exports},function(module,exports,__webpack_require__){var api=__webpack_require__(2);var content=__webpack_require__(16);content=content.__esModule?content.default:content;if(typeof content==="string"){content=[[module.i,content,""]]}var options={};options.insert="head";options.singleton=false;var update=api(content,options);var exported=content.locals?content.locals:{};module.exports=exported},function(module,exports,__webpack_require__){var ___CSS_LOADER_API_IMPORT___=__webpack_require__(3);exports=___CSS_LOADER_API_IMPORT___(false);exports.push([module.i,".licFeature {\n  -webkit-box-flex: 1;\n  -webkit-flex-grow: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1; }\n\n.licManagement__modal {\n  width: 70vw; }\n\n.licManagement__narrowText {\n  width: 240px; }\n\n.licManagement__ieFlex {\n  -webkit-flex-shrink: 0;\n      -ms-flex-negative: 0;\n          flex-shrink: 0; }\n",""]);module.exports=exports},function(module,exports){module.exports=__kbnSharedDeps__.React},function(module,exports){module.exports=__kbnSharedDeps__.ElasticEui},function(module,exports){module.exports=__kbnSharedDeps__.KbnI18nReact},function(module,exports){module.exports=__kbnSharedDeps__.ReactRouterDom},function(module,exports){module.exports=__kbnSharedDeps__.ReactDom},function(module,exports){module.exports=__kbnBundles__["plugin/kibanaReact"]},,function(module,exports){module.exports=__kbnSharedDeps__.MomentTimezone},function(module,exports){module.exports=__kbnBundles__["plugin/kibanaUtils"]},function(module,exports){module.exports=__kbnSharedDeps__.Moment}]);