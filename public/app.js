var play = function(pjs) {

  var nodeWidth = 125,
    nodeHeight = 110,
    nodeWidthOverTwo = nodeWidth / 2,
    nodeHeightOverTwo = nodeHeight / 2,
    nodeA = null,
    nodeB = null,
    nodeC = null,
    nodeD = null,
    connections = null,
    currentStep = 1;
    
  var Node = function(id, x, y) {
      this.id = id;
      this.x = x;
      this.y = y;
  };
  Node.prototype.setPeers = function(n) {
      this.peers = n;
  };
  Node.prototype.illustrate = function() {
      if (currentStep === 1) {
          return;
      }
      pjs.fill(241,241,236, 220);
      pjs.noStroke();
      pjs.rect(this.x, this.y, nodeWidth, nodeHeight, 10);
      pjs.fill(30,30,30);
      var textX = this.x + 5;
      var textY = this.y + 20;
      pjs.text(this.id, this.x + 55, textY);
      if (currentStep < 6) {
          return;
      }
      textY += 20;
      if (currentStep === 6) {
          pjs.text("dest", textX, textY);
          return;
      }
      else if (currentStep === 7) {
          pjs.text("dest  cost", textX, textY);
          return;
      }
      pjs.text("dest  cost  next", textX, textY);
      if (currentStep < 9) {
          return;
      }
      textY += 20;
      var peersLen = this.peers.length;
      for (var i = 0; i < peersLen; i++) {
          if (currentStep >= 10 || this.peers[i].cost !== -1) {
              var content = this.peers[i].id + "       ";
              var cost = this.peers[i].cost + "      ";
              cost = cost.substring(0, 7);
              content += cost + this.peers[i].nextHopId;
              pjs.text(content, textX, textY);
          }
          textY += 20;
      }
  };

  var Peer = function(neighborId, cost) {
      this.id = neighborId;
      this.cost = cost || -1;
      if (this.cost === -1) {
          this.nextHopId = null;
      }
      else {
          this.nextHopId = neighborId;
      }
  };

  var Connection = function(from, to, cost, x, y) {
      this.from = from;
      this.to = to;
      this.cost = cost;
      this.x = x;
      this.y = y;
  };
  Connection.prototype.illustrate = function() {
      pjs.stroke(206,205,198);
      pjs.strokeWeight(5);
      pjs.line(this.from.x + nodeWidthOverTwo, this.from.y + nodeHeightOverTwo,
          this.to.x+ nodeWidthOverTwo, this.to.y + nodeHeightOverTwo);
      if (currentStep < 4) {
          return;
      }
      pjs.textFont("Arial", 17);
      pjs.text(this.cost, this.x, this.y);
  };

  var Advertisement = function(from, to) {
  };

  var modelCurrentStep = function() {
      switch (currentStep) {
          case 15:
              updateTableEntry(nodeA, "c", 5, "c");
              break;
          case 16:
              updateTableEntry(nodeA, "c", 3, "b");
              break;
          case 22:
              updateTableEntry(nodeA, "d", -1, null);
              break;
          case 23:
              updateTableEntry(nodeA, "d", 6, "b");
              break;
          case 29:
              updateTableEntry(nodeB, "d", -1, null);
              break;
          case 30:
              updateTableEntry(nodeB, "d", 4, "c");
              break;
          case 32:
              updateTableEntry(nodeC, "a", 5, "a");
              break;
          case 33:
              updateTableEntry(nodeC, "a", 3, "b");
              break;
          case 37:
              updateTableEntry(nodeD, "a", -1, null);
              break;
          case 38:
              updateTableEntry(nodeD, "a", 6, "c");
              break;
          case 39:
              updateTableEntry(nodeD, "b", -1, null);
              break;
          case 40:
              updateTableEntry(nodeD, "b", 4, "c");
              break;
          default:
              break;
      }
  };

  var updateTableEntry = function(node, id, cost, nextHopId) {
    var peersLen = node.peers.length;
    for (var i = 0; i < peersLen; i++) {
      if (node.peers[i].id === id) {
        node.peers[i].cost = cost;
        node.peers[i].nextHopId = nextHopId;
      }
    }
  };

  var illustrateCurrentStep = function() {
      pjs.fill(30,30,30);
      pjs.textFont("Arial", 13);
      var lines = instructions[currentStep],
          lineY = 180,
          linesLen = lines.length;
      for (var i = 0; i < linesLen; i++) {
          pjs.text(lines[i], 170, lineY);
          lineY += 20;
      }
  };

  pjs.setup = function() {
      pjs.frameRate(60);
      pjs.size(pjs.screenWidth, pjs.screenHeight);
      nodeA = new Node("a", 30,10);
      nodeB = new Node("b", 240,10);
      nodeC = new Node("c", 30, 145);
      nodeD = new Node("d", 30, 280);
      nodeA.setPeers([
          new Peer(nodeB.id, 2), 
          new Peer(nodeC.id, 5), 
          new Peer(nodeD.id)
      ]);
      nodeB.setPeers([
          new Peer(nodeA.id, 2),
          new Peer(nodeC.id, 1), 
          new Peer(nodeD.id)
      ]);
      nodeC.setPeers([
          new Peer(nodeA.id, 5), 
          new Peer(nodeB.id, 1), 
          new Peer(nodeD.id, 3)
      ]);
      nodeD.setPeers([
          new Peer(nodeA.id),
          new Peer(nodeB.id), 
          new Peer(nodeC.id, 3)
      ]);
      connections = [
          new Connection(nodeA, nodeB, 2, 195, 60),
          new Connection(nodeB, nodeC, 1, 195, 125),
          new Connection(nodeA, nodeC, 5, 75, 140),
          new Connection(nodeC, nodeD, 3, 75, 275)
      ];
  };

  pjs.draw = function() {
      pjs.background(254,254,254);
      if (currentStep > 2) {
          for (var i = 0; i < connections.length; i++) {
              connections[i].illustrate();
          }
      }
      pjs.textFont("Arial", 17);
      nodeA.illustrate();
      nodeB.illustrate();
      nodeC.illustrate();
      nodeD.illustrate();
      illustrateCurrentStep();
      pjs.noLoop();
  };
      

  pjs.keyPressed = function() {
      if (pjs.keyCode === 39) {
          if (currentStep < 41) {
              currentStep++;
          }
          modelCurrentStep();
      }
      else if (pjs.keyCode === 37) {
          if (currentStep > 1) {
              currentStep--;
          }
          modelCurrentStep();
      }
      pjs.loop();
  };



}

var canvas = document.getElementById('app');
var processingInstance = new Processing(canvas, play);
