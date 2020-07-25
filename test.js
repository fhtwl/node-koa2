class A {
    constructor() {
        this.nameA = 'a'
    }
    fnA(){
        console.log('a')
    }
}
class B extends A {
    constructor() {
        super()
        this.nameB = 'b'
    }
    fnB(){
        console.log('b')
    }
}
class C extends B {
    constructor() {
        super()
        this.nameC = 'c'
    }
    fnC(){
        console.log('c')
    }
}
const c = new C()
console.log(getAttr(c))
/*
* @getAttr 获取自身以及父类的所有属性名和方法名
* @param(name) 属性名前缀
* @param(fn) 方法名前缀
*/
function getAttr(obj,name,fn) {
    const arr = [],_arr = []
    getPrototype(obj,arr)
    for(let i = 0;i<arr.length;i++) {
        for(let j=0;j<arr[i].length;j++) {
            if(arr[i][j].indexOf('name') > -1 || arr[i][j].indexOf('fn') > -1) {
                _arr.push(arr[i][j])
            }
        }
    }
    // const Obj = obj.constructor
    // const constructor = Obj.prototype.constructor
    // Array.prototype.slice.call(arguments)
    // arr.push(obj.__proto__)
    function getPrototype(obj,arr) {
        
        if(obj !== null) {
            arr.push(Object.getOwnPropertyNames(obj))
            let _obj = obj.__proto__
            getPrototype(_obj,arr)
        }
        else {
            return arr
        }
        
    }
    return _arr
}
