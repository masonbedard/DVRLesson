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
      var lines = null;
      switch (currentStep) {
          case 1:
              lines = [
                  "Distance vector routing is a distrubted",
                  "algorithm for determing the shortest",
                  "paths between nodes in a network.",
                  "",
                  "Use the right arrow key to advance",
                  "the lesson and the left arrow key",
                  "to revisit previous parts."
              ];
              break;
          case 2:
              lines = [
                  "Nodes are repsented by the rectangles",
                  "labeled a, b, c and d."
              ];
              break;
          case 3:
              lines = [
                  "Lines represent a direct connection",
                  "between two nodes, along which",
                  "information can travel."
              ];
              break;
          case 4:
              lines = [
                  "Each connection has an associated",
                  "cost for information traveling along",
                  "that path.",
                  "",
                  "Information wants to travel along",
                  "the route with the lowest cost."
              ];
              break;
          case 5:
              lines = [
                  "Each node keeps a table with three",
                  "columns.",
                  "",
                  "This table is used to decide which",
                  "path to take for reaching a desired",
                  "node in the network"
              ];
              break;
          case 6:
              lines = [
                  "The first column is the destination",
                  "node for the route represented by",
                  "that row in the table."
              ];
              break;
          case 7:
              lines = [
                  "The second column represents the",
                  "entire cost for reaching the destination",
                  "node from the table-owning node."
              ];
              break;
          case 8:
              lines = [
                  "The third column tells the table owner",
                  "which of its direct neighbors it should",
                  "send information to next, in order to",
                  "reach the destination node for the",
                  "advertised cost."
              ];
              break;
          case 9:
              lines = [
                  "Initially each node knows only the",
                  "costs for reaching its direct neighbors.",
                  "",
                  "The next node for reaching each of",
                  "the direct neighbors will be the",
                  "neighbor itself."
              ];
              break;
          case 10:
              lines = [
                  "The cost for destinations that nodes",
                  "cannot currently reach is set to -1",
                  "and the next node is set to null."
              ];
              break;
          case 11:
              lines = [
                  "Each node now sends its own table",
                  "to its direct neighbors.",
                  "",
                  "In other words, each node tell its",
                  "neighbors about everyone.",
                  "",
                  "This is what differentiates distance",
                  "vector routing from another network",
                  "routing algorithm, link-state routing,",
                  "in which each node tells everyone",
                  "about its neighbors."
              ];
              break;
          case 12:
              lines = [
                  "Let's take a look at this step from",
                  "each node's point of view, beginning",
                  "with a's.",
                  "",
                  "We'll first examine how a handles b's",
                  "initial advertisement."
              ];
              break;
          case 13:
              lines = [
                  "First a will ignore b's cost of 5 to reach",
                  "a, because a does not need to reach",
                  "itself."
              ];
              break;
          case 14:
              lines = [
                  "Then a will see that b has a cost of 1",
                  "to reach the destination c.",
                  "",
                  "If b can reach c with cost 1 and a",
                  "can reach b in cost 2, then a could",
                  "potentially reach c in cost 3 by",
                  "going through b.",
                  "",
                  "So a will update its entry for c."
              ];
              break;
          case 15:
              lines = [
                  "The cost for reaching c will change",
                  "from 5 to 3, and the node that should",
                  "be taken from a in order to reach c in",
                  "cost 3 will change from c to b."
              ];
              break;
          case 16:
              lines = [
                  "The cost for reaching c will change",
                  "from 5 to 3, and the node that should",
                  "be taken from a in order to reach c in",
                  "cost 3 will change from c to b."
              ];
              break;
          case 17:
              lines = [
                  "Finally, a will see that b advertised",
                  "a cost of -1 to d, which matches a's",
                  "current cost to d. Thus a will ignore",
                  "b's cost to d."
              ];
              break;
          case 18:
              lines = [
                  "Now let's investigate how a handles",
                  "the advertisement from its other",
                  "neighbor, c."
              ];
              break;
          case 19:
              lines = [
                  "As with b's advertisement, a will",
                  "ignore c's advertised cost for reaching",
                  "itself."
              ];
              break;
          case 20:
              lines = [
                  "Then a will consider c's cost for",
                  "reaching the destination b.",
                  "",
                  "c can reach b with cost 1, and a can",
                  "reach c in cost 3. Therefore a's",
                  "potential cost to b through c is 4,",
                  "which is higher than a's current cost",
                  "to b of 2. Thus a is not interested in",
                  "this new route."
              ];
              break;
          case 21:
              lines = [
                  "Finally, a will pay attention to",
                  "c's ability to reach d with cost 3.",
                  "",
                  "In a's table, the cost to c is currently",
                  "3 and the next node for that is b.",
                  "",
                  "The cost of 3 to reach c added to the",
                  "cost of 3 to reach d from c means that",
                  "a can reach d with cost 6. 6 is better",
                  "than -1 which implies an unreachable",
                  "destination, so a's table will update."
              ];
              break;
          case 22: 
              lines = [
                  "The cost for reaching d will change",
                  "from -1 to 6, and the node that should",
                  "be taken from a in order to reach d in",
                  "cost 6 will change from null to b.",
                  "",
                  "Pay attention to the fact that next",
                  "becomes b, even though the",
                  "advertisement came from c. This is",
                  "because the shortest path to d from a",
                  "is a to b to c to d."
              ];
              break;
          case 23: 
              lines = [
                  "The cost for reaching d will change",
                  "from -1 to 6, and the node that should",
                  "be taken from a in order to reach d in",
                  "cost 6 will change from null to b.",
                  "",
                  "Pay attention to the fact that next",
                  "becomes b, even though the",
                  "advertisement came from c. This is",
                  "because the shortest path to d from a",
                  "is a to b to c to d."
              ];
              break;
          case 24:
              lines = [
                  "Note that if c's advertisement",
                  "had reached a before b's, then",
                  "a would think that its shortest path",
                  "to d has cost 8 with c as the next node.",
                  "",
                  "The distance vector algorithm may",
                  "take a few cycles before determining",
                  "all correct shortest paths."
              ];
              break;
          case 25:
              lines = [
                  "To quickly run through the remainder",
                  "of the nodes, let's start with b.",
                  "",
                  "If b were to receive an advertisement",
                  "from a right now before ever receiving",
                  "an update from c, then a problem may",
                  "arise."
              ];
              break;
          case 26:
              lines = [
                  "In that case, b would learn from a",
                  "that a can reach d in cost 6.",
                  "Adding 6 to b's cost for reaching a",
                  "results in 8, which is better than -1.",
                  "",
                  "But wait! The next hop for a's route",
                  "of cost 6 to d is through...b.",
                  "Why would b get to d by going to a",
                  "and then coming right back to itself?",
              ];
              break;
          case 27:
              lines = [
                  "One partial solution in cases like",
                  "this is for nodes to ignore advertised",
                  "routes in which they themselves are",
                  "the next step."
              ];
              break;
          case 28:
              lines = [
                  "In the ideal situation, b would",
                  "receive c's advertisement and would",
                  "update its path to d as a result."
              ];
              break;
          case 29:
              lines = [
                  "The cost for reaching d will change",
                  "from -1 to 4, and the node that should",
                  "be taken from b in order to reach d in",
                  "cost 4 will change from null to c."
              ];
              break;
          case 30:
              lines = [
                  "The cost for reaching d will change",
                  "from -1 to 4, and the node that should",
                  "be taken from b in order to reach d in",
                  "cost 4 will change from null to c."
              ];
              break;
          case 31:
              lines = [
                  "Moving along to node c, c will",
                  "not find any information from a's",
                  "advertisements useful. But b's",
                  "advertised cost to a will cause an",
                  "update in c's routing table."
              ];
              break;
          case 32:
              lines = [
                  "The cost for reaching a will change",
                  "from 5 to 3, and the node that should",
                  "be taken from c in order to reach a in",
                  "cost 3 will change from a to b.",
                  "",
                  "Can you figure out why c used a cost",
                  "of 3 and not 2?"
              ];
              break;
          case 33:
              lines = [
                  "The cost for reaching a will change",
                  "from 5 to 3, and the node that should",
                  "be taken from c in order to reach a in",
                  "cost 3 will change from a to b.",
                  "",
                  "Can you figure out why c used a cost",
                  "of 3 and not just the 2 that b",
                  "advertised?"
              ];
              break;
          case 34:
              lines = [
                  "Finally, taking a look at d makes",
                  "it clear that the only advertisements",
                  "that d can see, given the current",
                  "connections, are c's."
              ];
              break;
          case 35:
              lines = [
                  "At this point, d would likely have",
                  "discovered paths to a and b through",
                  "c from one of c's early",
                  "advertisements.",
                  "",
                  "Specifically, if d had received an",
                  "advertisement of c's initial state,",
                  "it would have a cost of 8 to a", 
                  "and a cost of 4 to b."
              ];
              break;
          case 36:
              lines = [
                  "But let's just update d's table",
                  "directly to its most correct state,",
                  "upon receving an advertisement from",
                  "c about c's current state."
              ];
              break;
          case 37:
              lines = [
                  "The cost for reaching a will change",
                  "from -1 to 6, and the node that should",
                  "be taken from d in order to reach a in",
                  "cost 6 will change from null to c."
              ];
              break;
          case 38:
              lines = [
                  "The cost for reaching a will change",
                  "from -1 to 6, and the node that should",
                  "be taken from d in order to reach a in",
                  "cost 6 will change from null to c.",
                  "",
                  "Can you figure out the path from d",
                  "to a that has cost 6?"
              ];
              break;
          case 39:
              lines = [
                  "Then the cost for reaching b will",
                  "change from -1 to 4, and the node that",
                  "should be taken from d in order to",
                  "reach b in cost 4 will change from null",
                  "to c."
              ];
              break;
          case 40:
              lines = [
                  "Then the cost for reaching b will",
                  "change from -1 to 4, and the node that",
                  "should be taken from d in order to",
                  "reach b in cost 4 will change from null",
                  "to c."
              ];
              break;
          case 41:
              lines = [
                  "And those are the basics of distance",
                  "vector routing.",
                  "",
                  "If any connections are added or",
                  "removed, or if the costs of any",
                  "connections change, the algorithm will",
                  "run again to make sure that every node",
                  "node knows the most efficient paths to",
                  "reach every other node in the network."
              ];
              break;
          default:
              lines = [];
              break;
      }
      var lineY = 180,
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
