/**
 * Copyright 2014 Mozilla Foundation
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Class: ShaderJob
module Shumway.AVM2.AS.flash.display {
  import notImplemented = Shumway.Debug.notImplemented;
  import dummyConstructor = Shumway.Debug.dummyConstructor;
  import asCoerceString = Shumway.AVM2.Runtime.asCoerceString;
  export class ShaderJob extends flash.events.EventDispatcher {
    
    // Called whenever the class is initialized.
    static classInitializer: any = null;
    
    // Called whenever an instance of the class is initialized.
    static initializer: any = null;
    
    // List of static symbols to link.
    static classSymbols: string [] = null; // [];
    
    // List of instance symbols to link.
    static instanceSymbols: string [] = null; // [];
    
    constructor (shader: flash.display.Shader = null, target: ASObject = null, width: number /*int*/ = 0, height: number /*int*/ = 0) {
      shader = shader; target = target; width = width | 0; height = height | 0;
      false && super(undefined);
      dummyConstructor("public flash.display.ShaderJob");
    }
    
    // JS -> AS Bindings
    
    
    // AS -> JS Bindings
    
    // _shader: flash.display.Shader;
    // _target: ASObject;
    // _width: number /*int*/;
    // _height: number /*int*/;
    // _progress: number;
    get shader(): flash.display.Shader {
      notImplemented("public flash.display.ShaderJob::get shader"); return;
      // return this._shader;
    }
    set shader(s: flash.display.Shader) {
      s = s;
      notImplemented("public flash.display.ShaderJob::set shader"); return;
      // this._shader = s;
    }
    get target(): ASObject {
      notImplemented("public flash.display.ShaderJob::get target"); return;
      // return this._target;
    }
    set target(s: ASObject) {
      s = s;
      notImplemented("public flash.display.ShaderJob::set target"); return;
      // this._target = s;
    }
    get width(): number /*int*/ {
      notImplemented("public flash.display.ShaderJob::get width"); return;
      // return this._width;
    }
    set width(v: number /*int*/) {
      v = v | 0;
      notImplemented("public flash.display.ShaderJob::set width"); return;
      // this._width = v;
    }
    get height(): number /*int*/ {
      notImplemented("public flash.display.ShaderJob::get height"); return;
      // return this._height;
    }
    set height(v: number /*int*/) {
      v = v | 0;
      notImplemented("public flash.display.ShaderJob::set height"); return;
      // this._height = v;
    }
    get progress(): number {
      notImplemented("public flash.display.ShaderJob::get progress"); return;
      // return this._progress;
    }
    start(waitForCompletion: boolean = false): void {
      waitForCompletion = !!waitForCompletion;
      notImplemented("public flash.display.ShaderJob::start"); return;
    }
    cancel(): void {
      notImplemented("public flash.display.ShaderJob::cancel"); return;
    }
  }
}
