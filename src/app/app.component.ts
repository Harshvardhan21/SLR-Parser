import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  ready = false;
  index = 0; 
  title = 'cdProj';
  production = [{key:"",value:"",index:this.index}];
  table = [{c1:"",c2:"",c3:""}];
  input1 = "";
  input = "";
  stack = "";
  checkinput = true;

  addProd(){
    this.index++;
    let prods = {
      index: this.index,
      key:"",
      value:""
    };
    this.production.push(prods);
    // console.log(this.production);
  }

  remProd(prod:any) {
    this.production = this.production.filter(pro => pro.index != prod.index);
  }

  calculate(){
    console.log(this.production);
    this.table = [{c1:"",c2:"",c3:""}]
    this.ready = true;
    this.stack = ""
    this.input = this.input1;
  }

  check(){
    // if Reduce;
    for(let i of this.production){
      if(this.stack.includes(i.value)){
        this.stack = this.stack.slice(0,this.stack.length - i.value.length)
        this.stack+=i.key;
        return "Reduce "+i.key+"->"+i.value;
      }
    }

    // if Shift
    if(this.input!==""){
      this.stack+=this.input[0];
      this.input = this.input.slice(1,this.input.length)
      return "Shift"
    }

    // if Accept
    if(this.stack===this.production[0].key && this.input===""){
      return "Accept"
    }

    // if Error
    if(this.stack!=="" || this.input!==""){
      return "Error"
    }
    return "Reduce";
  }

  next(){
    let action = this.check();
    this.table.push({c1:'$'+this.stack,c2:this.input+'$',c3:action})
    if(action=="Accept" || action=="Error"){
      this.checkinput = false;
    }
  }

  reset(){
    this.ready = false;
    this.index = 0; 
    this.production = [{key:"",value:"",index:this.index}];
    this.table = [{c1:"",c2:"",c3:""}];
    this.input = "";
    this.stack = "";
  }

}
