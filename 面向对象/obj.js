/*
    1.对象赋值及对象中的this指向
 */
//当前方法作为对象的方法,因此this指向obj
var fun = function() {
    this.var++;
    console.log('obj_fun_'+this.var);
};
//对象收编变量
var obj = {
    var:0,
    fun:fun,
    /*初始化当前对象时会立即执行这个方法,但是fun2变量并没有被赋值成功*/
    fun2:(function(){
        console.log('obj_fun2_'+this.var);
        //因为当前方法并不属于obj,所以this.var为undefined
    })(),
    fun3:function(){
        this.fun();
    }
};
obj.fun();
//当使用obj.fun2()调用时会报错,提示fun2不是一个方法,只能当做对象变量调用
console.log(obj.fun2);
//这里会打印出fun2_undefined,因为fun2未被赋值成功,故提示undefined
obj.fun3();

/*
    2.函数式创建对象
 */
var obj2 = function () {};
//点语法式创建对象
obj2.var1 = 0;
obj2.fun1 = function(){
    this.var1++;
    console.log('obj2_fun1_'+this.var1);
};
for (let i = 0; i < 5; i++) {
    obj2.fun1();
}

/*
    3.以下演示创建一个假对象(通过调用函数返回一个对象)
 */
var obj3 = function () {
    return{
        var:0,
        fun:function () {
            this.var++;
            console.log('obj3_fun_'+this.var);
        }
    }
};

//创建的obj3_obj对象与obj3一点关系都没有;
var obj3_obj = obj3();
obj3_obj.fun();

/*
    以下通过类的方式创建一个对象
 */
var obj4 = function () {
    this.var = 0;
    this.fun = function () {
        this.var++;
        console.log('obj4_fun_'+this.var);
    }
};
//使用类式创建对象需要通过new关键字
var obj4_obj = new obj4();
obj4_obj.fun();



