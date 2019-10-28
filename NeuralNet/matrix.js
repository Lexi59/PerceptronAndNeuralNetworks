class Matrix{
  constructor(rows,cols){
    this.rows = rows;
    this.cols = cols;
    this.matrix = new Array();
    for(var i = 0; i < rows; i++){
      var row = new Array();
      for(var j = 0; j < cols; j++){
        row.push(0);
      }
      this.matrix.push(row);
    }
  }

  static fromArray(arr){
    let m = new Matrix(arr.length, 1);
    for(var i = 0; i < arr.length; i++){
      m.matrix[i][0] = arr[i];
    }
    return m;
  }

  toArray(){
    let arr = [];
    for(var i = 0; i < this.rows; i++){
      for(var j = 0; j < this.cols; j++){
        arr.push(this.matrix[i][j]);
      }
    }
    return arr;
  }

  randomize(){
    for(var i = 0; i < this.rows; i++){
      for(var j = 0; j < this.cols; j++){
        this.matrix[i][j] = Math.random() * 2 -1;
      }
    }
  }

  transpose(){
    let result = new Matrix(this.cols, this.rows);
    for(var i = 0; i < this.rows; i++){
      for(var j = 0; j < this.cols; j++){
        result.matrix[j][i] = this.matrix[i][j];
      }
    }
    return result;
  }

  multiply(n){
    if(n instanceof Matrix){
      if(this.cols !== n.rows){
        console.log("Can't multiply");
        return undefined;
      }
      let result = new Matrix(this.rows, n.cols);
      for(var i = 0; i < result.rows; i++){
        for(var j = 0; j < result.cols; j++){
          for(var k = 0; k < this.cols; k++){
            result.matrix[i][j] += this.matrix[i][k] * n.matrix[k][j];
          }
        }
      }
      return result;
    }
    else{
      for(var i = 0; i < this.rows; i++){
        for(var j = 0; j < this.cols; j++){
          this.matrix[i][j] *= n;
        }
      }
    }
  }

  add(n){
    if(n instanceof Matrix){
      for(var i = 0; i < this.rows; i++){
        for(var j = 0; j < this.cols; j++){
          this.matrix[i][j] += n.matrix[i][j];
        }
      }
    }
    else{
      for(var i = 0; i < this.rows; i++){
        for(var j = 0; j < this.cols; j++){
          this.matrix[i][j] += n;
        }
      }
    }
  }

  subtract(n){
    var result = new Matrix(this.rows, this.cols);
    if(this.rows != n.rows || this.cols != n.rows){
      return undefined;
    }
    for(var i = 0; i < this.rows; i++){
      for(var j = 0; j < this.cols; j++){
        result.matrix[i][j] = this.matrix[i][j] - n.matrix[i][j];
      }
    }
    return result;
  }

  map(func){
    for(let i =0; i < this.rows; i++){
      for(let j = 0; j < this.cols; j++){
        let val = this.matrix[i][j];
        this.matrix[i][j] = func(val);
      }
    }
  }
}
