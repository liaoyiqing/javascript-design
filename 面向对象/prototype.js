/*
* Function.prototype.addMethod = function(){}意思是给Function类添加原型方法,
* 原型方法的作用是:
* 1.每个使用Function类new出来的对象都会继承addMethod方法.
* 需要注意的是:
* 1.Function类本身不能调用原型方法,如:Function.addMethod().
* */
//不建议给Function原生对象添加原型方法,因为别人使用function(){}创建出来的对象和使用new Function()创建出来的对象都会受到原型方法的污染
Function.prototype.addMethod = function (name,fn) {
    //这里的this指的是Function new出来的对象(也可以理解为调用该方法的对象),下面代码的意思是给调用addMethod方法的对象添加一个名为name,值为fn的方法
    this[name] = fn;
    //如需链式调用需返回this
    return this;
};
//测试使用function(){}的方式创建对象,然后调用原型方法
var fun = function () {};
fun.addMethod('test',function () {
   console.log('Function_prototype_addMethod_obj_test');
});
fun.test();
//测试使用链式调用原型方法
fun.addMethod('test1',function () {
    console.log('test1');
    return this;
}).addMethod('test2',function () {
    console.log('test2');
    return this;
});
fun.test1().test2().addMethod('test3',function(){console.log('test3')}).test3();

/*
* 以上测试使用的是函数式调用方式,以下使用类式调用方式来测试
* */
Function.prototype.addMethods = function(name,fn){
    this.prototype[name] = fn;
    return this;
};
var Clazz = function () {};
Clazz.addMethods('test1',function () {
    console.log('Clazz_test1');
    return this;
}).addMethods('test2',function () {
    console.log('Clazz_test2');
    return this;
});
var obj = new Clazz();
obj.test1().test2();
/*
* 总结 以上两种调用方式
* 1.函数式调用方式:函数式调用方式只能使用new出来的fun对象来添加方法,而且也仅限于当前对象使用添加的方法
* 2.类式调用方式:使用类式调用,可以使每个new出来的对象都能继承test1,test2方法
* */

/*
* 活学活用
* 试着定义一个可以为函数添加多个方法的addMethod方法
* */
//1.定义一个函数
var Clas = function () {};
//2.给Clas函数定义一个addMethod方法
Clas.addMethod = function (name,fn) {
    this.prototype[name] = fn;
    return this;
};
//3.调用addMethod方法方法,添加多个方法
Clas.addMethod('test1',function () {
    console.log('Clas_test1');
    return this;
}).addMethod('test2',function(){
    console.log('Clas_test2')
});
//4.生成Clas对象 调用测试方法
var cla = new Clas();
cla.test1().test2();
//总结:使用以上方法可以避免污染Function原生对象


