var instructions = [
    [ // 0
        "Distance vector routing is a distrubted",
        "algorithm for determing the shortest",
        "paths between nodes in a network.",
        "",
        "Use the right arrow key to advance",
        "the lesson and the left arrow key",
        "to revisit previous parts."
    ],
    [
        "Nodes are repsented by the rectangles",
        "labeled a, b, c and d."
    ],
    [
        "Nodes are repsented by the rectangles",
        "labeled a, b, c and d."
    ],
    [
        "Nodes are repsented by the rectangles",
        "labeled a, b, c and d."
    ],
    [
        "Nodes are repsented by the rectangles",
        "labeled a, b, c and d."
    ],
    [ // 5
        "Nodes are repsented by the rectangles",
        "labeled a, b, c and d."
    ],
    [
        "Lines represent a direct connection",
        "between two nodes, along which",
        "information can travel."
    ],
    [
        "Each connection has an associated",
        "cost for information traveling along",
        "that path.",
        "",
        "Information wants to travel along",
        "the route with the lowest cost."
    ],
    [
        "Each node keeps a table with three",
        "columns.",
        "",
        "This table is used to decide which",
        "path to take for reaching a desired",
        "node in the network"
    ],
    [ 
        "The first column is the destination",
        "node for the route represented by",
        "that row in the table."
    ],
    [ // 10
        "The second column represents the",
        "entire cost for reaching the destination",
        "node from the table-owning node."
    ],
    [
        "The third column tells the table owner",
        "which of its direct neighbors it should",
        "send information to next, in order to",
        "reach the destination node for the",
        "advertised cost."
    ],
    [
        "Initially each node knows only the",
        "costs for reaching its direct neighbors.",
        "",
        "The next node for reaching each of",
        "the direct neighbors will be the",
        "neighbor itself."
    ],
    [
        "The cost for destinations that nodes",
        "cannot currently reach is set to -1",
        "and the next node is set to null."
    ],
    [
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
    ],
    [ // 15
        "Let's take a look at this step from",
        "each node's point of view, beginning",
        "with a's.",
        "",
        "We'll first examine how a handles b's",
        "initial advertisement."
    ],
    [
        "First a will ignore b's cost of 5 to reach",
        "a, because a does not need to reach",
        "itself."
    ],
    [
        "Then a will see that b has a cost of 1",
        "to reach the destination c.",
        "",
        "If b can reach c with cost 1 and a",
        "can reach b in cost 2, then a could",
        "potentially reach c in cost 3 by",
        "going through b.",
        "",
        "So a will update its entry for c."
    ],
    [
        "The cost for reaching c will change",
        "from 5 to 3, and the node that should",
        "be taken from a in order to reach c in",
        "cost 3 will change from c to b."
    ],
    [
        "The cost for reaching c will change",
        "from 5 to 3, and the node that should",
        "be taken from a in order to reach c in",
        "cost 3 will change from c to b."
    ],
    [ // 20
        "Finally, a will see that b advertised",
        "a cost of -1 to d, which matches a's",
        "current cost to d. Thus a will ignore",
        "b's cost to d."
    ],
    [
        "Now let's investigate how a handles",
        "the advertisement from its other",
        "neighbor, c."
    ],
    [
        "As with b's advertisement, a will",
        "ignore c's advertised cost for reaching",
        "itself."
    ],
    [
        "Then a will consider c's cost for",
        "reaching the destination b.",
        "",
        "c can reach b with cost 1, and a can",
        "reach c in cost 3. Therefore a's",
        "potential cost to b through c is 4,",
        "which is higher than a's current cost",
        "to b of 2. Thus a is not interested in",
        "this new route."
    ],
    [
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
    ],
    [
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
    ],
    [
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
    ],
    [
        "Note that if c's advertisement",
        "had reached a before b's, then",
        "a would think that its shortest path",
        "to d has cost 8 with c as the next node.",
        "",
        "The distance vector algorithm may",
        "take a few cycles before determining",
        "all correct shortest paths."
    ],
    [
        "To quickly run through the remainder",
        "of the nodes, let's start with b.",
        "",
        "If b were to receive an advertisement",
        "from a right now before ever receiving",
        "an update from c, then a problem may",
        "arise."
    ],
    [
        "In that case, b would learn from a",
        "that a can reach d in cost 6.",
        "Adding 6 to b's cost for reaching a",
        "results in 8, which is better than -1.",
        "",
        "But wait! The next hop for a's route",
        "of cost 6 to d is through...b.",
        "Why would b get to d by going to a",
        "and then coming right back to itself?",
    ],
    [
        "One partial solution in cases like",
        "this is for nodes to ignore advertised",
        "routes in which they themselves are",
        "the next step."
    ],
    [
        "In the ideal situation, b would",
        "receive c's advertisement and would",
        "update its path to d as a result."
    ],
    [
        "The cost for reaching d will change",
        "from -1 to 4, and the node that should",
        "be taken from b in order to reach d in",
        "cost 4 will change from null to c."
    ],
    [
        "The cost for reaching d will change",
        "from -1 to 4, and the node that should",
        "be taken from b in order to reach d in",
        "cost 4 will change from null to c."
    ],
    [
        "Moving along to node c, c will",
        "not find any information from a's",
        "advertisements useful. But b's",
        "advertised cost to a will cause an",
        "update in c's routing table."
    ],
    [
        "The cost for reaching a will change",
        "from 5 to 3, and the node that should",
        "be taken from c in order to reach a in",
        "cost 3 will change from a to b.",
        "",
        "Can you figure out why c used a cost",
        "of 3 and not 2?"
    ],
    [
        "The cost for reaching a will change",
        "from 5 to 3, and the node that should",
        "be taken from c in order to reach a in",
        "cost 3 will change from a to b.",
        "",
        "Can you figure out why c used a cost",
        "of 3 and not just the 2 that b",
        "advertised?"
    ],
    [
        "Finally, taking a look at d makes",
        "it clear that the only advertisements",
        "that d can see, given the current",
        "connections, are c's."
    ],
    [
        "At this point, d would likely have",
        "discovered paths to a and b through",
        "c from one of c's early",
        "advertisements.",
        "",
        "Specifically, if d had received an",
        "advertisement of c's initial state,",
        "it would have a cost of 8 to a", 
        "and a cost of 4 to b."
    ],
    [
        "But let's just update d's table",
        "directly to its most correct state,",
        "upon receving an advertisement from",
        "c about c's current state."
    ],
    [
        "The cost for reaching a will change",
        "from -1 to 6, and the node that should",
        "be taken from d in order to reach a in",
        "cost 6 will change from null to c."
    ],
    [
        "The cost for reaching a will change",
        "from -1 to 6, and the node that should",
        "be taken from d in order to reach a in",
        "cost 6 will change from null to c.",
        "",
        "Can you figure out the path from d",
        "to a that has cost 6?"
    ],
    [
        "Then the cost for reaching b will",
        "change from -1 to 4, and the node that",
        "should be taken from d in order to",
        "reach b in cost 4 will change from null",
        "to c."
    ],
    [
        "Then the cost for reaching b will",
        "change from -1 to 4, and the node that",
        "should be taken from d in order to",
        "reach b in cost 4 will change from null",
        "to c."
    ],
    [
        "And those are the basics of distance",
        "vector routing.",
        "",
        "If any connections are added or",
        "removed, or if the costs of any",
        "connections change, the algorithm will",
        "run again to make sure that every node",
        "node knows the most efficient paths to",
        "reach every other node in the network."
    ]
];