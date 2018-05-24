/** @class */ (function () {
    function class_1() {
    }
    return class_1;
}());
"modal-header" >
    Details < /label>
    < button;
type = "button";
var default_1 = /** @class */ (function () {
    function default_1() {
    }
    return default_1;
}());
"close"(click) = "closeModal()" >  & times;
/button>
    < /div>
    < div;
var default_2 = /** @class */ (function () {
    function default_2() {
    }
    return default_2;
}());
"modal-body" >
;
"userForm"(ngSubmit) = "onSave()" >
    /** @class */ (function () {
        function class_2() {
        }
        return class_2;
    }());
"form-group" >
;
for ( = "dboyName" > Name < /label>
    < input; type = "text"; /** @class */ (function () {
    function class_3() {
    }
    return class_3;
}()) = "form-control")
    name = "name";
formControlName = "name";
id = "dboyName";
placeholder = "Name" >
    /div>
    < div;
var default_3 = /** @class */ (function () {
    function default_3() {
    }
    return default_3;
}());
"form-group" >
;
for ( = "dboyEmail" > Email < /label>
    < input; type = "email"; /** @class */ (function () {
    function class_4() {
    }
    return class_4;
}()) = "form-control")
    name = "email";
formControlName = "email";
id = "dboyEmail";
placeholder = "Email" >
    /div>
    < div;
var default_4 = /** @class */ (function () {
    function default_4() {
    }
    return default_4;
}());
"form-group" >
;
for ( = "dboyAge" > Age < /label>
    < input; type = "number"; /** @class */ (function () {
    function class_5() {
    }
    return class_5;
}()) = "form-control")
    name = "age";
formControlName = "age";
id = "dboyAge";
placeholder = "Age" >
    /div>
    < div;
var default_5 = /** @class */ (function () {
    function default_5() {
    }
    return default_5;
}());
"form-group" >
;
for ( = "dboyAddress" > Address < /label>
    < input; type = "text"; /** @class */ (function () {
    function class_6() {
    }
    return class_6;
}()) = "form-control")
    name = "address";
formControlName = "address";
id = "dboyAddress";
placeholder = "Address" >
    /div>
    < div;
var default_6 = /** @class */ (function () {
    function default_6() {
    }
    return default_6;
}());
"form-group" >
;
for ( = "dboyPhone" > Phone < /label>
    < input; type = "number"; /** @class */ (function () {
    function class_7() {
    }
    return class_7;
}()) = "form-control")
    name = "phone";
formControlName = "phone";
id = "dboyPhone";
placeholder = "Phone" >
    /div>
    < div;
var default_7 = /** @class */ (function () {
    function default_7() {
    }
    return default_7;
}());
"form-group" >
;
for ( = "dboyAssign" > Assign; Location < /label>
    < select; type = "number") {
    var default_8 = /** @class */ (function () {
        function default_8() {
        }
        return default_8;
    }());
}
"form-control";
name = "location";
formControlName = "location";
id = "dboyAssign" >
     * ngFor;
"let location of locations"[value] = "location.label" > {};
{
    location.label;
}
/option>
    < /select>
    < /div>
    < div;
var default_9 = /** @class */ (function () {
    function default_9() {
    }
    return default_9;
}());
"form-group" >
    type;
"submit"[disabled] = "!userForm.valid";
var default_10 = /** @class */ (function () {
    function default_10() {
    }
    return default_10;
}());
"btn btn-default" > Save < /button>
    < button;
type = "button";
var default_11 = /** @class */ (function () {
    function default_11() {
    }
    return default_11;
}());
"btn btn-default"(click) = "closeModal()" > Close < /button>
    < /div>
    < /form>
    < /div>;
