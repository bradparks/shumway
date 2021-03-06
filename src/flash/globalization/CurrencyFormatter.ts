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
// Class: CurrencyFormatter
module Shumway.AVM2.AS.flash.globalization {
  import notImplemented = Shumway.Debug.notImplemented;
  import dummyConstructor = Shumway.Debug.dummyConstructor;
  import asCoerceString = Shumway.AVM2.Runtime.asCoerceString;
  export class CurrencyFormatter extends ASNative {
    
    // Called whenever the class is initialized.
    static classInitializer: any = null;
    
    // Called whenever an instance of the class is initialized.
    static initializer: any = null;
    
    // List of static symbols to link.
    static classSymbols: string [] = null; // [];
    
    // List of instance symbols to link.
    static instanceSymbols: string [] = null; // ["format"];
    
    constructor (requestedLocaleIDName: string) {
      requestedLocaleIDName = asCoerceString(requestedLocaleIDName);
      false && super();
      dummyConstructor("public flash.globalization.CurrencyFormatter");
    }
    
    // JS -> AS Bindings
    
    format: (value: number, withCurrencySymbol: boolean = false) => string;
    
    // AS -> JS Bindings
    static getAvailableLocaleIDNames(): ASVector<any> {
      notImplemented("public flash.globalization.CurrencyFormatter::static getAvailableLocaleIDNames"); return;
    }
    
    // _currencyISOCode: string;
    // _currencySymbol: string;
    // _lastOperationStatus: string;
    // _requestedLocaleIDName: string;
    // _actualLocaleIDName: string;
    // _fractionalDigits: number /*int*/;
    // _useGrouping: boolean;
    // _groupingPattern: string;
    // _digitsType: number /*uint*/;
    // _decimalSeparator: string;
    // _groupingSeparator: string;
    // _negativeSymbol: string;
    // _negativeCurrencyFormat: number /*uint*/;
    // _positiveCurrencyFormat: number /*uint*/;
    // _leadingZero: boolean;
    // _trailingZeros: boolean;
    get currencyISOCode(): string {
      notImplemented("public flash.globalization.CurrencyFormatter::get currencyISOCode"); return;
      // return this._currencyISOCode;
    }
    get currencySymbol(): string {
      notImplemented("public flash.globalization.CurrencyFormatter::get currencySymbol"); return;
      // return this._currencySymbol;
    }
    get lastOperationStatus(): string {
      notImplemented("public flash.globalization.CurrencyFormatter::get lastOperationStatus"); return;
      // return this._lastOperationStatus;
    }
    get requestedLocaleIDName(): string {
      notImplemented("public flash.globalization.CurrencyFormatter::get requestedLocaleIDName"); return;
      // return this._requestedLocaleIDName;
    }
    get actualLocaleIDName(): string {
      notImplemented("public flash.globalization.CurrencyFormatter::get actualLocaleIDName"); return;
      // return this._actualLocaleIDName;
    }
    get fractionalDigits(): number /*int*/ {
      notImplemented("public flash.globalization.CurrencyFormatter::get fractionalDigits"); return;
      // return this._fractionalDigits;
    }
    set fractionalDigits(value: number /*int*/) {
      value = value | 0;
      notImplemented("public flash.globalization.CurrencyFormatter::set fractionalDigits"); return;
      // this._fractionalDigits = value;
    }
    get useGrouping(): boolean {
      notImplemented("public flash.globalization.CurrencyFormatter::get useGrouping"); return;
      // return this._useGrouping;
    }
    set useGrouping(value: boolean) {
      value = !!value;
      notImplemented("public flash.globalization.CurrencyFormatter::set useGrouping"); return;
      // this._useGrouping = value;
    }
    get groupingPattern(): string {
      notImplemented("public flash.globalization.CurrencyFormatter::get groupingPattern"); return;
      // return this._groupingPattern;
    }
    set groupingPattern(value: string) {
      value = asCoerceString(value);
      notImplemented("public flash.globalization.CurrencyFormatter::set groupingPattern"); return;
      // this._groupingPattern = value;
    }
    get digitsType(): number /*uint*/ {
      notImplemented("public flash.globalization.CurrencyFormatter::get digitsType"); return;
      // return this._digitsType;
    }
    set digitsType(value: number /*uint*/) {
      value = value >>> 0;
      notImplemented("public flash.globalization.CurrencyFormatter::set digitsType"); return;
      // this._digitsType = value;
    }
    get decimalSeparator(): string {
      notImplemented("public flash.globalization.CurrencyFormatter::get decimalSeparator"); return;
      // return this._decimalSeparator;
    }
    set decimalSeparator(value: string) {
      value = asCoerceString(value);
      notImplemented("public flash.globalization.CurrencyFormatter::set decimalSeparator"); return;
      // this._decimalSeparator = value;
    }
    get groupingSeparator(): string {
      notImplemented("public flash.globalization.CurrencyFormatter::get groupingSeparator"); return;
      // return this._groupingSeparator;
    }
    set groupingSeparator(value: string) {
      value = asCoerceString(value);
      notImplemented("public flash.globalization.CurrencyFormatter::set groupingSeparator"); return;
      // this._groupingSeparator = value;
    }
    get negativeSymbol(): string {
      notImplemented("public flash.globalization.CurrencyFormatter::get negativeSymbol"); return;
      // return this._negativeSymbol;
    }
    set negativeSymbol(value: string) {
      value = asCoerceString(value);
      notImplemented("public flash.globalization.CurrencyFormatter::set negativeSymbol"); return;
      // this._negativeSymbol = value;
    }
    get negativeCurrencyFormat(): number /*uint*/ {
      notImplemented("public flash.globalization.CurrencyFormatter::get negativeCurrencyFormat"); return;
      // return this._negativeCurrencyFormat;
    }
    set negativeCurrencyFormat(value: number /*uint*/) {
      value = value >>> 0;
      notImplemented("public flash.globalization.CurrencyFormatter::set negativeCurrencyFormat"); return;
      // this._negativeCurrencyFormat = value;
    }
    get positiveCurrencyFormat(): number /*uint*/ {
      notImplemented("public flash.globalization.CurrencyFormatter::get positiveCurrencyFormat"); return;
      // return this._positiveCurrencyFormat;
    }
    set positiveCurrencyFormat(value: number /*uint*/) {
      value = value >>> 0;
      notImplemented("public flash.globalization.CurrencyFormatter::set positiveCurrencyFormat"); return;
      // this._positiveCurrencyFormat = value;
    }
    get leadingZero(): boolean {
      notImplemented("public flash.globalization.CurrencyFormatter::get leadingZero"); return;
      // return this._leadingZero;
    }
    set leadingZero(value: boolean) {
      value = !!value;
      notImplemented("public flash.globalization.CurrencyFormatter::set leadingZero"); return;
      // this._leadingZero = value;
    }
    get trailingZeros(): boolean {
      notImplemented("public flash.globalization.CurrencyFormatter::get trailingZeros"); return;
      // return this._trailingZeros;
    }
    set trailingZeros(value: boolean) {
      value = !!value;
      notImplemented("public flash.globalization.CurrencyFormatter::set trailingZeros"); return;
      // this._trailingZeros = value;
    }
    setCurrency(currencyISOCode: string, currencySymbol: string): void {
      currencyISOCode = asCoerceString(currencyISOCode); currencySymbol = asCoerceString(currencySymbol);
      notImplemented("public flash.globalization.CurrencyFormatter::setCurrency"); return;
    }
    formattingWithCurrencySymbolIsSafe(requestedISOCode: string): boolean {
      requestedISOCode = asCoerceString(requestedISOCode);
      notImplemented("public flash.globalization.CurrencyFormatter::formattingWithCurrencySymbolIsSafe"); return;
    }
    parse(inputString: string): flash.globalization.CurrencyParseResult {
      inputString = asCoerceString(inputString);
      notImplemented("public flash.globalization.CurrencyFormatter::parse"); return;
    }
    ctor(requestedLocaleIDName: string): void {
      requestedLocaleIDName = asCoerceString(requestedLocaleIDName);
      notImplemented("public flash.globalization.CurrencyFormatter::ctor"); return;
    }
    formatImplementation(value: number, withCurrencySymbol: boolean): string {
      value = +value; withCurrencySymbol = !!withCurrencySymbol;
      notImplemented("public flash.globalization.CurrencyFormatter::formatImplementation"); return;
    }
  }
}
