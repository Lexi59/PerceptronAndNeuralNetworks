class NeuralNetwork{
  constructor(input, hidden, output){
    this.inputNodes = input;
    this.hiddenNodes = hidden;
    this.outputNodes = output;

    this.weightsIH = new Matrix(this.hiddenNodes, this.inputNodes);
    this.weightsHO = new Matrix(this.outputNodes, this.hiddenNodes);
    this.weightsIH.randomize();
    this.weightsHO.randomize();

    this.hiddenBias = new Matrix(this.hiddenNodes, 1);
    this.outputBias = new Matrix(this.outputNodes, 1);
    this.hiddenBias.randomize();
    this.outputBias.randomize();
  }

  sigmoid(x){
    return 1/(1+Math.exp(-x));
  }

  feedforward(inputs){
    //generating hidden outputs
    let m = Matrix.fromArray(inputs);
    let hidden = this.weightsIH.multiply(m);
    hidden.add(this.hiddenBias);
    hidden.map(this.sigmoid);

    //generating outputs
    let out = this.weightsHO.multiply(hidden);
    out.add(this.outputBias);
    out.map(this.sigmoid);

    return out.toArray();
  }

  train(inputs, targets){
    let outputs = this.feedforward(inputs);

    outputs = Matrix.fromArray(outputs);
    targets = Matrix.fromArray(targets);

    let error = targets.subtract(outputs);
  }
}
