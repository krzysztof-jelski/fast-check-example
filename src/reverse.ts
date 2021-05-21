export default function reverse(t:any) {
    var len = t.length;
    for(var i = 0; i < len; i++) {
        var currentElement = t[i];
        if(i >= len/2) { break; }
        var j = len-i-1;
        var reversedElement = t[j];
        t[i] = reversedElement;
        t[j] = currentElement;
    }
    return t;
}
