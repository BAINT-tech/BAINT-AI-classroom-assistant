/* ══════════════════════════════════════════════════════════════════════════
   BAINT AI LESSON LIBRARY  (lessons.js)
   To add a topic, copy any eduAdd(...) block below and edit it. The app needs no other change.
   eduAdd(id, subject, alsoSubjects, title, aliases[], meaning, everydayPicture,
          keyIdeas[], example, whereUsed, advantages[], disadvantages[], summary, options)
   aliases = every way a student might name the topic (spelling mistakes are handled automatically).
   ══════════════════════════════════════════════════════════════════════════ */
const EDU_LESSONS = [];
function eduAdd(id, subject, also, title, aliases, meaning, think, steps, example, uses, adv, dis, summary, opts){
  EDU_LESSONS.push(Object.assign({id, subject, also: also || [], title, aliases, meaning, think, steps, example, uses, adv, dis, summary}, opts || {}));
}

/* ── MATHEMATICS ── */
eduAdd("algebra","math",[],"Algebra",
 ["algebra","algebraic expression","algebraic expressions","solve for x","unknown value","unknown values","variables in algebra","linear equation","linear equations"],
 "Algebra uses letters (called variables) to stand for unknown or changing numbers, so we can write general rules and solve problems.",
 "A variable is like a closed box with a hidden number inside. Algebra is the method for finding what is in the box.",
 ["Name the unknown with a letter, such as x.","Write the situation as an equation.","Do the same operation to both sides so the equation stays balanced.","Isolate x, then check by putting the answer back into the equation."],
 "x + 5 = 12. Subtract 5 from both sides: x = 7. Check: 7 + 5 = 12, so it is correct.\nPractical case: a taxi charges $3 plus $2 per km. For a $13 fare, 3 + 2k = 13, so 2k = 10 and k = 5 km.",
 "Budgeting, phone plans, cooking quantities, science formulas, computer programs and engineering designs.",
 ["Handles unknown values and general rules, not just one number","Turns word problems into equations you can solve","Is the base for calculus, physics, programming and finance"],
 ["The symbols can feel abstract at the start","Small sign or bracket mistakes give wrong answers","Not every real situation fits a simple equation"],
 "Algebra = using letters for unknowns to solve problems.");

eduAdd("probability","math",[],"Probability",
 ["probability","probabilities","chance","chances","likelihood","odds","how likely"],
 "Probability measures how likely an event is to happen. It is a number from 0 (impossible) to 1 (certain), or from 0% to 100%.",
 "Think of a weather forecast: a 30% chance of rain means it rains on about 3 out of 10 similar days.",
 ["List all possible outcomes (the sample space).","Count the favourable outcomes, the ones you want.","Probability = favourable outcomes ÷ total outcomes.","Check that the answer is between 0 and 1."],
 "Rolling a fair six-sided die: the outcomes are 1, 2, 3, 4, 5, 6. Even numbers are 2, 4, 6, so P(even) = 3 ÷ 6 = 1/2. P(not a 6) = 5/6.",
 "Weather forecasts, insurance, medicine, games, sports, quality control and machine learning.",
 ["Helps you make decisions when the future is uncertain","Lets you compare risks using numbers","Is the foundation of statistics, insurance and AI"],
 ["Gives the likelihood, not a guarantee for one single event","Simple formula assumes all outcomes are equally likely","Small samples can behave very differently from the theory"],
 "Probability = favourable outcomes ÷ total outcomes, always between 0 and 1.");

eduAdd("calculus","math",[],"Calculus",
 ["calculus","differential calculus","integral calculus"],
 "Calculus is the branch of mathematics that studies change (using derivatives) and accumulation (using integrals).",
 "A car's speedometer shows how fast the position is changing right now (derivative). The odometer shows the total distance built up over time (integral).",
 ["Limits: look at the value a quantity gets closer and closer to.","Derivative: the rate of change, or slope, at a point. For example d/dx of x² is 2x.","Integral: the total accumulated amount, or area under a curve. For example the integral of 2x is x² + C.","The two are linked: integration reverses differentiation."],
 "If distance s = t² (in metres, t in seconds), speed is the derivative: v = 2t. At t = 3 s the speed is 6 m/s.",
 "Physics (motion), engineering, economics (maximum profit), medicine (drug levels) and machine learning.",
 ["Describes motion, growth and change precisely","Finds maximum and minimum values, such as best profit or least cost","Is the base of physics, engineering, economics and data science"],
 ["Needs strong algebra and function skills first","Ideas like limits take time to understand","Many real problems have no neat formula and need computers"],
 "Calculus = the maths of change (derivatives) and accumulation (integrals).");

eduAdd("derivatives","math",[],"Derivatives",
 ["derivative","derivatives","differentiation","differentiate","rate of change","slope of a curve","gradient of a curve","gradient at a point","tangent to a curve","equation of the tangent","equation of a tangent","tangent line","normal to a curve","equation of the normal"],
 "A derivative measures how fast a quantity is changing. Geometrically it is the slope of a curve at one point.",
 "It is the speedometer reading: not the average speed of the whole trip, but your speed at this exact moment.",
 ["Power rule: the derivative of xⁿ is n·xⁿ⁻¹.","A constant multiplier stays: the derivative of 3x² is 3 × 2x.","Differentiate a sum term by term.","Put in a value of x to get the slope at that point."],
 "f(x) = 3x² + 5x. Then f′(x) = 6x + 5. At x = 2 the slope is 6(2) + 5 = 17.",
 "Speed and acceleration, marginal cost in business, growth rates, and finding maximum or minimum values.",
 ["Gives exact rates of change at any moment","Finds the highest and lowest points of a function","Helps model motion, growth and optimisation"],
 ["Rules must be learned and applied carefully","Needs the function to be smooth at that point","Messy functions are hard to differentiate by hand"],
 "Derivative = rate of change = slope at a point.");

eduAdd("integrals","math",[],"Integrals",
 ["integral","integrals","integration","integrate","area under a curve","antiderivative"],
 "An integral adds up infinitely many tiny pieces to find a total, such as the area under a curve. It is the reverse of differentiation.",
 "Imagine filling a tank with a tap whose flow keeps changing. The integral adds all the little amounts to give the total water in the tank.",
 ["Power rule: the integral of xⁿ is xⁿ⁺¹ ÷ (n + 1) + C (when n is not −1).","Integrate term by term.","Add the constant C for an indefinite integral.","For a definite integral, subtract the value at the lower limit from the upper limit."],
 "The integral of 2x from 0 to 3 is [x²] from 0 to 3 = 9 − 0 = 9. That is the area under y = 2x between x = 0 and x = 3.",
 "Areas and volumes, total distance from speed, work done by a force, probability and electrical charge.",
 ["Finds totals, areas and volumes exactly","Reverses differentiation, so the two skills support each other","Used widely in physics, engineering and statistics"],
 ["Harder than differentiation and has no single rule that always works","Needs the constant C remembered for indefinite integrals","Many integrals can only be solved numerically"],
 "Integral = total accumulated amount = area under a curve.");

eduAdd("geometry","math",[],"Geometry",
 ["geometry","shapes","angles","triangle","triangles","circle","circles","polygon","polygons","perimeter","pythagoras","pythagoras theorem","pythagorean theorem"],
 "Geometry studies shapes, sizes, angles and the space around us.",
 "Geometry is the maths of anything you can draw or build: rooms, roads, wheels and roofs.",
 ["Identify the shape and its properties.","Choose the right formula: rectangle area = length × width, triangle area = ½ × base × height, circle area = πr².","Use angle rules, for example the angles in a triangle add up to 180°.","For a right triangle use Pythagoras: a² + b² = c², where c is the longest side."],
 "A right triangle has short sides 3 and 4. The longest side is √(3² + 4²) = √25 = 5.\nPractical case: a rectangular room 5 m by 4 m needs 5 × 4 = 20 m² of flooring.",
 "Building and architecture, maps and GPS, design, art, computer graphics and engineering.",
 ["Connects maths to real objects: buildings, maps and design","Builds visual and logical thinking","Proofs train careful, step-by-step reasoning"],
 ["Many formulas to remember","Diagrams that are not drawn to scale can mislead","3D shapes are hard to picture on paper"],
 "Geometry = the maths of shapes, sizes and angles.");

eduAdd("statistics","math",[],"Statistics",
 ["statistics","statistic","data analysis","data handling","mean median mode","arithmetic mean","average","averages","median","standard deviation"],
 "Statistics is the science of collecting, organising, analysing and interpreting data to find patterns and make decisions.",
 "Statistics is like summarising a whole class's marks in a few numbers so you can understand the class without reading every paper.",
 ["Collect the data.","Summarise it: mean (add all values ÷ how many), median (middle value), mode (most frequent value).","Measure the spread with the range or standard deviation.","Show the data in a table or graph and interpret what it tells you."],
 "Marks: 4, 6, 6, 8, 11. Mean = (4 + 6 + 6 + 8 + 11) ÷ 5 = 35 ÷ 5 = 7. Median = 6 (the middle value). Mode = 6 (appears twice).",
 "Health research, elections and surveys, sports, business, weather and quality control.",
 ["Turns raw data into clear conclusions","Supports decisions in health, business and science","Reveals trends and patterns"],
 ["Biased or very small data gives misleading results","An average can hide extreme values and the spread","Correlation is not the same as cause"],
 "Statistics = collect, summarise and interpret data.");

eduAdd("trigonometry","math",[],"Trigonometry",
 ["trigonometry","trig","sine","cosine","tangent","sin cos tan","sohcahtoa","trigonometric ratios"],
 "Trigonometry studies the relationship between the angles and sides of triangles, mainly right triangles, using sine, cosine and tangent.",
 "It is a way to measure things you cannot reach, like the height of a tree, by using an angle and one distance.",
 ["Label the sides relative to your angle: hypotenuse (longest), opposite and adjacent.","Remember SOH-CAH-TOA: sin = opposite ÷ hypotenuse, cos = adjacent ÷ hypotenuse, tan = opposite ÷ adjacent.","Choose the ratio that uses the sides you know and the one you want.","Solve for the unknown side or angle."],
 "A 10 m ladder leans at 60° to the ground. The height it reaches = 10 × sin 60° ≈ 10 × 0.866 = 8.66 m.",
 "Navigation, surveying, architecture, physics (waves), music, animation and games.",
 ["Measures heights and distances that cannot be measured directly","Used in navigation, engineering, physics and graphics","Describes waves and repeating cycles"],
 ["At basic level it works mainly with right triangles","Calculator mode (degrees or radians) causes common mistakes","Many identities to learn"],
 "Trigonometry = angles and sides of triangles using sin, cos and tan.");

eduAdd("fractions","math",[],"Fractions",
 ["fraction","fractions","numerator","denominator","improper fraction","mixed number"],
 "A fraction shows part of a whole as one number over another, like 3/4. The numerator (top) counts the parts taken and the denominator (bottom) says how many equal parts make the whole.",
 "Cut a pizza into 4 equal slices. Taking 3 slices means you took 3/4 of the pizza.",
 ["Split the whole into equal parts: that number is the denominator.","Count the parts you have: that number is the numerator.","To add or subtract, first make the denominators the same.","To multiply, multiply tops and bottoms. To divide, flip the second fraction and multiply."],
 "1/2 + 1/4 = 2/4 + 1/4 = 3/4.\nPractical case: a recipe needs 3/4 cup of milk and you want to double it: 2 × 3/4 = 6/4 = 1 1/2 cups.",
 "Cooking, measuring, money, time (quarter of an hour), sharing and probability.",
 ["Shows exact amounts, such as 1/3, that decimals cannot write exactly","Natural for sharing, measuring and recipes","Prepares you for ratios, percentages and algebra"],
 ["Adding and subtracting needs a common denominator","Comparing unlike fractions takes extra work","Large fractions are harder to picture than decimals"],
 "Fraction = part of a whole: numerator ÷ denominator.");

eduAdd("percentages","math",[],"Percentages",
 ["percentage","percentages","percent","per cent","percentage increase","percentage decrease"],
 "A percentage is a number out of 100. So 25% means 25 out of 100, which is 1/4.",
 "Percent literally means per hundred. If 100 students take a test and 80 pass, the pass rate is 80%.",
 ["Percent ÷ 100 gives the decimal (25% → 0.25).","To find p% of a number, multiply the number by p ÷ 100.","To increase by p%, multiply by (1 + p/100). To decrease, multiply by (1 − p/100).","Check that the answer makes sense (10% off should be a little less)."],
 "20% of 150 = 0.20 × 150 = 30. A $150 jacket with 20% off costs 150 − 30 = $120.",
 "Discounts, interest rates, exam marks, taxes, statistics and battery levels.",
 ["Makes different quantities easy to compare on the same scale","Used everywhere: shopping, banking, results","Easy to read and understand"],
 ["Percentages of different totals can mislead (10% of 1000 is not 10% of 10)","Successive percentage changes do not simply add up","You must know the base value for a percentage to mean anything"],
 "Percentage = a number out of 100.");

eduAdd("ratio_proportion","math",[],"Ratio and proportion",
 ["ratio","ratios","proportion","proportions","direct proportion","inverse proportion"],
 "A ratio compares two quantities by division, like 2:3. A proportion says that two ratios are equal, like 2:3 = 4:6.",
 "A drink mixed as 1 part juice to 4 parts water has a ratio of 1:4, whether you make one glass or a whole jug.",
 ["Write the quantities in the order given.","Simplify by dividing both numbers by a common factor.","To share in a ratio, add the parts, find the value of one part, then multiply.","In a proportion, cross-multiply to find the missing value."],
 "Share $50 in the ratio 2:3. Total parts = 5, so one part = $10. The shares are $20 and $30.",
 "Cooking and mixing, maps and scale drawings, speed, currency exchange and paint mixing.",
 ["Compares sizes without needing the exact units","Scales recipes, maps and mixtures easily","Simple to calculate"],
 ["Order matters: 2:3 is not the same as 3:2","A ratio hides the actual totals","Assumes quantities scale evenly, which is not always true in real life"],
 "Ratio = comparison by division; proportion = two equal ratios.");

eduAdd("exponents","math",[],"Exponents",
 ["exponent","exponents","indices","index laws","laws of indices","laws of exponents","powers of numbers"],
 "An exponent tells you how many times a number (the base) is multiplied by itself. For example 2³ = 2 × 2 × 2 = 8.",
 "Exponents are shorthand for repeated multiplication, like writing 10³ instead of 10 × 10 × 10.",
 ["Write the base and the exponent: aⁿ.","Same base, multiply: aᵐ × aⁿ = aᵐ⁺ⁿ.","Same base, divide: aᵐ ÷ aⁿ = aᵐ⁻ⁿ.","Power of a power: (aᵐ)ⁿ = aᵐⁿ, and any number to the power 0 is 1."],
 "3² × 3⁴ = 3⁶ = 729.",
 "Scientific notation, compound interest, population growth, computer memory sizes and radioactive decay.",
 ["Writes very large or very small numbers compactly","Models fast growth and decay","Simplifies repeated multiplication"],
 ["Easy to confuse 2³ (8) with 2 × 3 (6)","Negative and fractional exponents need care","Values grow so quickly that small mistakes become huge"],
 "Exponent = how many times the base is multiplied by itself.");

eduAdd("logarithms","math",[],"Logarithms",
 ["logarithm","logarithms","log","logs","natural log","log base"],
 "A logarithm answers the question: to what power must the base be raised to get this number? For example log₂ 8 = 3 because 2³ = 8.",
 "A logarithm is the undo button for an exponent.",
 ["log_b(x) = y means bʸ = x.","log(xy) = log x + log y.","log(x ÷ y) = log x − log y.","log(xⁿ) = n × log x."],
 "log₁₀ 1000 = 3 because 10³ = 1000.",
 "The pH scale, decibels for sound, earthquake magnitude, compound interest and computer science.",
 ["Turns multiplication into addition","Handles huge ranges of numbers, such as pH and decibels","Solves equations where the unknown is an exponent"],
 ["Only defined for positive numbers","Less intuitive at first","Rules are easy to misapply: log(x + y) is not log x + log y"],
 "Logarithm = the power needed to reach a number.");

eduAdd("functions","math",[],"Functions",
 ["function","functions","domain and range","graph of a function","input and output"],
 "A function is a rule that gives exactly one output for each input. It is often written f(x).",
 "A function is like a vending machine: you put in a choice (input) and get exactly one item (output).",
 ["Choose an input x.","Apply the rule, for example f(x) = 2x + 1.","Read the output f(x).","Plot the input-output pairs to draw the graph."],
 "f(x) = 2x + 1. Then f(3) = 2(3) + 1 = 7, and f(0) = 1.",
 "Pricing formulas, speed-time graphs, spreadsheets, programming and science models.",
 ["Describes relationships clearly","Lets you predict outputs for new inputs","The language of graphs, calculus and programming"],
 ["Notation like f(x) confuses beginners","Some functions are only valid for certain inputs (the domain)","Real situations are often more complex than one simple rule"],
 "Function = a rule: each input gives exactly one output.");

eduAdd("quadratic","math",[],"Quadratic equations",
 ["quadratic","quadratics","quadratic equation","quadratic equations"],
 "A quadratic equation has the form ax² + bx + c = 0 (with a not zero). The highest power of x is 2, and it can have two, one or no real solutions.",
 "Throw a ball upward: its height over time follows a quadratic curve that rises and falls.",
 ["Write the equation as ax² + bx + c = 0.","Try factorising, or use the formula x = (−b ± √(b² − 4ac)) ÷ 2a.","Check the discriminant b² − 4ac: positive gives two real roots, zero gives one, negative gives none.","Substitute your answers back to check them."],
 "x² − 5x + 6 = 0. Factorise: (x − 2)(x − 3) = 0, so x = 2 or x = 3.",
 "Projectile paths, areas, bridge and arch design, profit models and physics.",
 ["Models curved paths and area problems","The formula works for every quadratic","The discriminant tells you the number of solutions quickly"],
 ["The formula needs careful arithmetic","Some quadratics have no real solutions","Factorising by inspection is not always easy"],
 "Quadratic = ax² + bx + c = 0, solved by factorising or the formula.");

eduAdd("matrices","math",[],"Matrices",
 ["matrix","matrices","determinant"],
 "A matrix is a rectangular table of numbers arranged in rows and columns. It is used to organise data and solve systems of equations.",
 "A matrix is like a spreadsheet of numbers that you can add, multiply and transform as one object.",
 ["Size = number of rows × number of columns.","To add or subtract, the matrices must be the same size; combine entry by entry.","To multiply, take rows of the first with columns of the second.","The determinant of [a b; c d] is ad − bc."],
 "[1 2; 3 4] + [5 6; 7 8] = [6 8; 10 12].",
 "Computer graphics, data science, AI, engineering, economics and solving many equations at once.",
 ["Solves many equations at once","Basis of computer graphics, data science and AI","Stores and organises data compactly"],
 ["Multiplication order matters: AB is not always BA","Large matrices need a computer","Not every matrix has an inverse"],
 "Matrix = a table of numbers with rules for adding and multiplying.");

eduAdd("sets","math",[],"Set theory",
 ["set theory","sets in maths","sets in mathematics","types of sets","venn diagram","venn diagrams","union and intersection"],
 "A set is a collection of distinct objects, such as {2, 4, 6}. Set theory studies how sets combine and relate.",
 "A set is like a basket of items. A Venn diagram shows which items two baskets share.",
 ["List or describe the members of the set.","Union (A ∪ B): everything in A or B or both.","Intersection (A ∩ B): only what is in both.","Complement: everything not in the set."],
 "A = {1, 2, 3, 4}, B = {3, 4, 5}. A ∪ B = {1, 2, 3, 4, 5}. A ∩ B = {3, 4}.",
 "Databases, logic, probability, programming and sorting information.",
 ["Organises information clearly","Venn diagrams make relationships easy to see","Foundation for logic, probability and databases"],
 ["Notation looks unfamiliar at first","Venn diagrams get messy with many sets","Very large or infinite sets need careful handling"],
 "Set = a collection of distinct objects.");

eduAdd("number_systems","math",[],"Types of numbers",
 ["real numbers","integers","rational numbers","irrational numbers","natural numbers","whole numbers","types of numbers","number system","number systems"],
 "Numbers are grouped into families: natural (1, 2, 3…), whole (0, 1, 2…), integers (…−1, 0, 1…), rational (fractions), irrational (like √2 and π) and real (all of these together).",
 "Think of nesting boxes: natural numbers sit inside whole numbers, inside integers, inside rational numbers, inside real numbers.",
 ["Natural numbers count objects: 1, 2, 3…","Integers include zero and negatives.","Rational numbers can be written as a fraction of integers, like 3/4.","Irrational numbers cannot, such as √2 and π; together with rationals they make the real numbers."],
 "−5 is an integer but not a natural number. 0.75 = 3/4 is rational. √2 = 1.41421… never ends or repeats, so it is irrational.",
 "Counting, money, measuring, computing and every branch of maths.",
 ["Gives a clear way to classify numbers","Helps you choose the right method for a problem","Builds the base for algebra and calculus"],
 ["Many similar names to remember","Irrational numbers can only be approximated as decimals","Abstract ideas like infinity are hard at first"],
 "Number families: natural ⊂ whole ⊂ integers ⊂ rational ⊂ real.");

eduAdd("arithmetic","math",[],"Arithmetic",
 ["arithmetic","addition","subtraction","multiplication","division","basic operations","four operations","order of operations","bodmas","pemdas"],
 "Arithmetic is the part of maths that deals with the basic operations on numbers: addition, subtraction, multiplication and division.",
 "Arithmetic is the toolkit used for everyday counting, shopping and measuring.",
 ["Addition combines amounts.","Subtraction finds what is left, or the difference.","Multiplication is repeated addition; division shares or groups into equal parts.","With several operations, follow the order: brackets, powers, multiplication and division, then addition and subtraction."],
 "2 + 3 × 4 = 2 + 12 = 14, not 20, because multiplication comes before addition.",
 "Shopping, cooking, travel time, budgeting and every other part of maths.",
 ["Needed in daily life","Builds number sense for every other topic","Can be checked easily"],
 ["Small slips (carrying, signs) change the answer","Mental maths takes practice","Order-of-operations mistakes are common"],
 "Arithmetic = + − × ÷ done in the right order.");

eduAdd("mathematics","math",[],"Mathematics",
 ["mathematics","maths","math","what is math"],
 "Mathematics is the study of numbers, quantities, shapes and patterns, and of the logical rules that connect them.",
 "Maths is a precise language for the world: instead of saying 'a lot', you say exactly how many.",
 ["Start with numbers and operations (arithmetic).","Use symbols for unknowns (algebra).","Study shapes and space (geometry).","Study change and data (calculus, statistics and probability)."],
 "3 pens cost $6, so 1 pen costs $2 and 10 pens cost $20.",
 "Budgeting, building, cooking, medicine, computing and all of science.",
 ["Gives exact answers you can check","Builds logical thinking and problem solving","Is the foundation of science, engineering, finance and technology"],
 ["Can feel abstract without real examples","Missing basics make later topics harder","A small slip in one step gives a wrong answer"],
 "Mathematics = the logic of numbers, shapes and patterns.",
 {overview:true});

/* ── MORE MATHEMATICS ── */
eduAdd("decimals","math",[],"Decimals",
 ["decimal","decimals","decimal point","decimal places","place value","rounding","round off"],
 "A decimal is a way of writing a number that is not whole, using a decimal point. Digits after the point show tenths, hundredths, thousandths and so on.",
 "Money is a good picture: $2.75 is 2 whole dollars and 75 hundredths of a dollar.",
 ["Digits to the left of the point are whole numbers; to the right are parts: tenths, hundredths, thousandths.","To add or subtract, line up the decimal points.","To multiply, ignore the points, multiply, then count the decimal places in total.","To round, look at the next digit: 5 or more rounds up, 4 or less stays."],
 "0.75 means 7 tenths and 5 hundredths, which equals 75/100 = 3/4. Round 3.468 to 2 decimal places: the next digit is 8, so it becomes 3.47.",
 "Money, measuring, weighing, calculators, science and sports timing.",
 ["Easy to compare and order numbers","Works well with calculators and money","Shows very precise measurements"],
 ["Some fractions, such as 1/3, never end as decimals","Rounding creates small errors","Misplaced decimal points cause big mistakes"],
 "Decimal = a number written with a point, with place values after it.");

eduAdd("prime_factors","math",[],"Prime numbers and factors",
 ["prime number","prime numbers","prime","prime factor","prime factors","prime factorisation","prime factorization","factors","multiples","hcf","lcm","highest common factor","lowest common multiple"],
 "A prime number has exactly two factors: 1 and itself (like 2, 3, 5, 7, 11). A factor is a number that divides another exactly. Prime factors are the prime numbers that multiply together to make a number.",
 "Prime numbers are like the atoms of numbers: every whole number above 1 is built from them.",
 ["List the factors: numbers that divide exactly with no remainder.","Check if the number is prime: only 1 and itself divide it.","Prime factorise by dividing by the smallest prime again and again until you reach 1.","HCF = the largest number that divides both; LCM = the smallest number both divide into."],
 "Prime factors of 60: 60 ÷ 2 = 30, ÷ 2 = 15, ÷ 3 = 5, ÷ 5 = 1. So 60 = 2 × 2 × 3 × 5 = 2² × 3 × 5.",
 "Simplifying fractions, finding common denominators, codes and encryption.",
 ["Make fractions easier to simplify","Give a unique 'fingerprint' for every number","Used in computer security"],
 ["Large numbers take a long time to factorise by hand","Easy to forget that 1 is not prime","Needs good times-table knowledge"],
 "Prime factors = the prime numbers that multiply to give a number.");

eduAdd("simultaneous_equations","math",[],"Simultaneous equations",
 ["simultaneous equation","simultaneous equations","system of equations","systems of equations","elimination method","substitution method"],
 "Simultaneous equations are two or more equations with the same unknowns that must all be true at the same time.",
 "Two clues about the same mystery: each clue alone is not enough, but together they give the answer.",
 ["Write both equations clearly.","Elimination: add or subtract the equations to remove one unknown.","Or substitution: rearrange one equation and put it into the other.","Solve for one unknown, then substitute back to find the other, and check in both equations."],
 "x + y = 10 and x − y = 2. Add them: 2x = 12, so x = 6. Then y = 4. Check: 6 + 4 = 10 and 6 − 4 = 2.",
 "Prices of two items, mixing problems, speeds, and finding where two lines cross.",
 ["Solves problems with more than one unknown","Works for many real situations","Basis for matrices and linear algebra"],
 ["More steps, so arithmetic slips are common","Some pairs have no solution or infinitely many","Harder when the equations are not linear"],
 "Simultaneous equations = find values that satisfy all equations at once.");

eduAdd("sequences","math",[],"Sequences and series",
 ["sequence","sequences","series","arithmetic sequence","geometric sequence","arithmetic progression","geometric progression","nth term"],
 "A sequence is a list of numbers that follows a rule. A series is the sum of the terms of a sequence.",
 "A sequence is like climbing stairs by a fixed rule: +3 each step, or ×2 each step.",
 ["Find the rule: what is added or multiplied each time?","Arithmetic sequence: add the same amount d each time; nth term = a + (n − 1)d.","Geometric sequence: multiply by the same ratio r each time; nth term = a × rⁿ⁻¹.","A series adds the terms together."],
 "2, 5, 8, 11, … adds 3 each time: a = 2, d = 3, so the 10th term is 2 + 9 × 3 = 29.",
 "Savings and loans, population growth, patterns and computer loops.",
 ["Helps predict future values","Describes growth and saving","Foundation for series and calculus"],
 ["Not every pattern has a simple rule","Formulas are easy to mix up","Can grow too fast to picture (geometric)"],
 "Sequence = numbers following a rule; series = their sum.");

eduAdd("standard_form","math",[],"Standard form",
 ["standard form","scientific notation","significant figures"],
 "Standard form writes very large or very small numbers as a × 10ⁿ, where a is between 1 and 10.",
 "Instead of writing lots of zeros, you count how many places the decimal point moved.",
 ["Move the decimal point so there is one non-zero digit before it.","Count how many places you moved: that is the power of 10.","Large numbers have a positive power; small numbers have a negative power.","To multiply, multiply the numbers and add the powers."],
 "The distance to the Sun is about 150,000,000 km = 1.5 × 10⁸ km. A hair's width of 0.00008 m = 8 × 10⁻⁵ m.",
 "Astronomy, chemistry, physics, computers and medicine.",
 ["Short and easy to compare","Avoids counting many zeros","Standard in science"],
 ["Needs care with the sign of the power","Calculator entry can be confusing","Less friendly for everyday numbers"],
 "Standard form = a × 10ⁿ with 1 ≤ a < 10.");

eduAdd("inequalities","math",[],"Inequalities",
 ["inequality","inequalities","greater than","less than","solve inequality"],
 "An inequality compares two values using <, >, ≤ or ≥ instead of an equals sign, so it has a range of answers.",
 "A sign saying 'height limit 2 m' allows every height up to 2 m, not just one.",
 ["Treat it like an equation: do the same to both sides.","If you multiply or divide by a negative number, flip the sign.","Write the answer as a range, e.g. x > 3.","Show it on a number line and test a value to check."],
 "2x + 1 < 9 → 2x < 8 → x < 4. Check x = 3: 7 < 9 is true.",
 "Budgets, speed limits, safe temperatures and minimum marks to pass.",
 ["Describes limits and ranges","Matches real-life rules","Useful in optimisation"],
 ["Forgetting to flip the sign is a common error","Many answers instead of one","Graphs can be confusing at first"],
 "Inequality = a comparison with <, >, ≤ or ≥; answers are ranges.");

eduAdd("vectors","math",["physics"],"Vectors",
 ["vector","vectors","scalar and vector","magnitude and direction"],
 "A vector has both size (magnitude) and direction. A scalar has size only.",
 "Walking 5 km tells distance (scalar); walking 5 km north tells a vector.",
 ["Draw a vector as an arrow: length is the magnitude, the arrow shows direction.","Add vectors tip to tail.","Write in components, e.g. (3, 4).","Magnitude = √(x² + y²)."],
 "The vector (3, 4) has magnitude √(9 + 16) = 5. Adding (3, 4) and (1, 2) gives (4, 6).",
 "Forces, velocity, navigation, games and graphics.",
 ["Describes direction as well as size","Needed for forces and motion","Used in games and engineering"],
 ["Direction makes adding more complex than numbers","Easy to confuse with scalars","Needs diagrams or components"],
 "Vector = magnitude + direction.");

eduAdd("area_volume","math",[],"Area and volume",
 ["area","volume","surface area","area and volume","cuboid","cylinder","sphere"],
 "Area measures the flat space inside a 2D shape (in square units). Volume measures the space inside a 3D solid (in cubic units).",
 "Area is how much paint covers a wall; volume is how much water fills a tank.",
 ["Rectangle area = length × width; triangle = ½ × base × height; circle = πr².","Cuboid volume = length × width × height.","Cylinder volume = πr²h; sphere volume = 4/3 πr³.","Always write the units: cm², m³."],
 "A room 5 m × 4 m has area 20 m². A tank 2 m × 1 m × 1.5 m holds 3 m³ of water.",
 "Flooring and painting, packaging, tanks, construction and cooking.",
 ["Lets you plan materials and cost","Used in building and design","Links maths to real objects"],
 ["Many formulas to remember","Unit mistakes (cm² vs m²) are common","Irregular shapes need splitting into simple ones"],
 "Area = 2D space (units²); volume = 3D space (units³).");

/* ── BIOCHEMISTRY ── */
eduAdd("biochemistry","biochemistry",[],"Biochemistry",
 ["biochemistry","biochem","biological chemistry","chemistry of life"],
 "Biochemistry is the study of the chemical substances and reactions that happen inside living organisms.",
 "A cell is like a tiny chemical factory. Biochemistry studies its machines (enzymes), raw materials (nutrients) and products.",
 ["Study the main biomolecules: carbohydrates, lipids, proteins and nucleic acids.","See how enzymes speed up reactions.","Follow metabolic pathways that release or store energy, such as glycolysis and ATP production.","Link molecules to function, health and disease."],
 "You eat bread. Enzymes break the starch into glucose. Your cells turn glucose into ATP, which powers your muscles and brain.",
 "Medicine, nutrition, drug design, forensic science, agriculture and biotechnology.",
 ["Explains how life works at the molecular level","Is the base of medicine, nutrition and drug design","Helps diagnose and treat metabolic diseases"],
 ["Many molecules, pathways and names to learn","Reactions are interconnected, so it can feel complex","Results in a test tube do not always match the whole body"],
 "Biochemistry = the chemistry of living things.",
 {overview:true});

eduAdd("catalyst","chemistry",["biochemistry"],"Catalysts",
 ["catalyst","catalysts","catalysis","catalytic","catalyse","catalyze"],
 "A catalyst is a substance that speeds up a chemical reaction without being used up. It works by giving the reaction an easier path that needs less activation energy.",
 "A catalyst is like a tunnel through a mountain: same start and same destination, but an easier route.",
 ["Reactants need a minimum energy, the activation energy, before they can react.","The catalyst offers another pathway with a lower activation energy.","More particles react each second, so the reaction rate increases.","The catalyst is regenerated at the end, so it can be used again. It does not change the amount of product at equilibrium."],
 "Hydrogen peroxide breaks down very slowly into water and oxygen. Add manganese dioxide, or the enzyme catalase found in liver and potato, and it fizzes quickly. Enzymes are the catalysts of living cells.",
 "Making ammonia (iron catalyst), car catalytic converters (platinum, palladium), margarine (nickel) and every enzyme reaction in your body.",
 ["Speeds up reactions so less time and energy are needed","Reusable, and small amounts are enough","Lets reactions run at lower temperatures, saving cost and energy"],
 ["Some catalysts are expensive, such as platinum","Catalysts can be poisoned by impurities and stop working","Often work for only one type of reaction; enzymes are damaged by heat or the wrong pH"],
 "Catalyst = speeds up a reaction and comes out unchanged.");

eduAdd("enzymes","biochemistry",["biology","enzymology"],"Enzymes",
 ["enzyme","enzymes","active site","biological catalyst","enzyme function","lock and key"],
 "Enzymes are protein molecules that act as biological catalysts: they speed up chemical reactions in living things.",
 "Think of a lock and key. The substrate (key) fits the enzyme's active site (lock) so the reaction can happen.",
 ["The substrate binds to the active site, forming an enzyme-substrate complex.","The enzyme lowers the activation energy and turns substrate into product.","The product leaves and the enzyme is free to work again.","Temperature, pH and substrate concentration change how fast it works."],
 "Amylase in your saliva breaks starch into sugars. Chew bread for a while and it starts to taste sweet.",
 "Digestion, medicine, washing powders, cheese and bread making, and diagnostic tests.",
 ["Very fast and highly specific","Work at body temperature and mild pH","Needed for digestion, energy release and DNA copying"],
 ["Denature (lose shape) when too hot or at the wrong pH","Can be blocked by inhibitors","Delicate and costly to make or store outside the body"],
 "Enzyme = a protein catalyst with a specific active site.");

eduAdd("proteins","biochemistry",["biology"],"Proteins",
 ["protein","proteins","protein structure","polypeptide"],
 "Proteins are large molecules made of chains of amino acids folded into specific 3D shapes. The shape decides the job.",
 "A protein is like a chain of beads that folds itself into a tool, and each tool has its own job.",
 ["Amino acids join with peptide bonds into a chain (primary structure).","The chain coils and folds locally (secondary: helix and sheet).","It folds into a full 3D shape (tertiary); several chains can join (quaternary).","If the shape changes, the function is lost."],
 "Haemoglobin carries oxygen in blood, collagen strengthens skin and bones, and insulin is a hormone made of protein.",
 "Muscles, enzymes, hormones, antibodies, transport in blood and body structure.",
 ["Do almost every job in cells: enzymes, structure, transport, defence and signals","Highly specific shapes allow precise functions","Can be rebuilt from amino acids in food"],
 ["Sensitive to heat and pH (denaturation)","Misfolded proteins can cause disease","The body needs a regular supply because extra amino acids are not stored as protein"],
 "Protein = amino acid chain folded into a working shape.");

eduAdd("amino_acids","biochemistry",["biology"],"Amino acids",
 ["amino acid","amino acids","peptide bond","essential amino acids"],
 "Amino acids are the small building blocks of proteins. Each has an amino group, a carboxyl group, a hydrogen and a variable side chain (R group) on a central carbon.",
 "Amino acids are like letters, and proteins are the words and sentences made from them.",
 ["There are 20 standard amino acids, and they differ only in the R group.","A peptide bond joins the carboxyl group of one to the amino group of the next.","Many linked amino acids form a polypeptide, which folds into a protein.","Nine are essential for humans, so they must come from food."],
 "Glycine is the simplest amino acid (its R group is just H). Eggs, meat, beans and soy provide the essential amino acids.",
 "Building proteins, making hormones and neurotransmitters, nutrition and sports supplements.",
 ["Combine in many ways to make thousands of proteins","Provide building material and some energy","Some are precursors of hormones and neurotransmitters"],
 ["Essential ones cannot be made by the body","Imbalances or inherited defects cause diseases such as phenylketonuria","Excess nitrogen has to be removed by the kidneys"],
 "Amino acid = building block of proteins.");

eduAdd("carbohydrates","biochemistry",["biology"],"Carbohydrates",
 ["carbohydrate","carbohydrates","carbs","sugar","sugars","starch","glucose"],
 "Carbohydrates are molecules of carbon, hydrogen and oxygen that give quick energy and structure. They include sugars, starch, glycogen and cellulose.",
 "Carbohydrates are the body's quick-release fuel, like petrol that is easy to burn.",
 ["Monosaccharides are single sugars, such as glucose.","Disaccharides are two sugars joined, such as sucrose.","Polysaccharides are long chains: starch (plants), glycogen (animals), cellulose (cell walls).","Cells break glucose down to make ATP."],
 "Rice is mostly starch. Digestion turns it into glucose, which fuels your brain and muscles.",
 "Energy for the brain and muscles, plant cell walls, food and paper.",
 ["Fast and easily available energy","Can be stored as glycogen or starch","Cellulose gives plants strength, and fibre helps digestion"],
 ["Too much refined sugar is linked to weight gain and diabetes risk","The body stores only a limited amount as glycogen","Some people cannot digest certain sugars, as in lactose intolerance"],
 "Carbohydrates = sugars, starch and fibre: quick energy.");

eduAdd("lipids","biochemistry",["biology"],"Lipids (fats and oils)",
 ["lipid","lipids","fats and oils","fatty acids","triglyceride","triglycerides","saturated fat","unsaturated fat"],
 "Lipids are fats, oils and related molecules that do not dissolve in water. They store energy, form cell membranes and act as signals.",
 "Lipids are the body's long-term energy tank and its waterproof wrapping.",
 ["Fatty acids are the basic units.","Three fatty acids plus glycerol make a triglyceride, used for energy storage.","Phospholipids form the double layer of cell membranes.","Steroids, such as cholesterol and many hormones, are also lipids."],
 "Butter is rich in saturated fat. Olive oil is mostly unsaturated. A layer of fat under the skin insulates the body.",
 "Energy storage, cell membranes, hormones, insulation and absorbing vitamins A, D, E and K.",
 ["Store a lot of energy in a small mass","Insulate the body and protect organs","Needed for membranes, hormones and vitamin absorption"],
 ["Too much saturated or trans fat raises heart disease risk","Energy is released more slowly than from carbohydrates","Extra energy intake is stored as body fat"],
 "Lipids = fats, oils and steroids: energy storage and membranes.");

eduAdd("nucleic_acids","biochemistry",["biology"],"Nucleic acids (DNA and RNA)",
 ["nucleic acid","nucleic acids","rna","dna and rna","nucleotide","nucleotides","dna structure","double helix"],
 "Nucleic acids, DNA and RNA, are long chains of nucleotides that store and use genetic information.",
 "DNA is the recipe book kept safe in the nucleus. RNA is the photocopy taken to the kitchen (the ribosome) to make the dish (the protein).",
 ["A nucleotide = a sugar + a phosphate + a base.","DNA has two strands in a double helix; bases pair A with T and C with G.","RNA usually has one strand and uses U instead of T.","Information flows DNA → RNA → protein (transcription, then translation)."],
 "The DNA code for insulin is copied into messenger RNA. Ribosomes read it and build the insulin protein.",
 "Inheritance, protein making, genetic testing, vaccines and forensic science.",
 ["Store huge amounts of information in a tiny space","Can be copied accurately for inheritance","Allow cells to build every protein they need"],
 ["Damage or mutation can cause disease","Delicate: enzymes break them down quickly","Copying errors, although rare, do happen"],
 "Nucleic acids = DNA and RNA: they store and use genetic information.");

eduAdd("metabolism","biochemistry",["biology"],"Metabolism",
 ["metabolism","metabolic","metabolic pathway","metabolic pathways","catabolism","anabolism"],
 "Metabolism is the sum of all chemical reactions in a living organism. Catabolic reactions break molecules down to release energy; anabolic reactions build molecules using energy.",
 "Metabolism is like a household budget: catabolism is income (energy released) and anabolism is spending (building and repair).",
 ["Catabolism: big molecules to small, releasing energy (glucose → CO₂ + water + ATP).","Anabolism: small molecules to big, using energy (amino acids → protein).","Enzymes control each step, and pathways are regulated.","ATP links the two sets of reactions."],
 "After a meal, glucose is used for energy, and the extra is stored as glycogen or fat.",
 "Nutrition, weight management, diabetes care, sports science and drug action.",
 ["Provides energy and building blocks for life","Is tightly regulated so cells adapt to need","Lets the body store and recycle nutrients"],
 ["Disorders such as diabetes disturb energy balance","Pathways are complex and interconnected","Needs a constant supply of fuel and oxygen"],
 "Metabolism = all the chemical reactions that keep a cell alive.");

eduAdd("atp","biochemistry",["biology"],"ATP",
 ["atp","adenosine triphosphate","energy currency","cell energy currency"],
 "ATP (adenosine triphosphate) is the molecule cells use as their immediate energy currency.",
 "ATP is like a rechargeable battery: use it and it becomes ADP, recharge it and it becomes ATP again.",
 ["ATP has three phosphate groups.","Removing the last phosphate (ATP → ADP + Pi) releases usable energy.","Cells recharge ADP back to ATP using energy from food (respiration).","ATP powers muscle contraction, active transport and building molecules."],
 "Each time a muscle fibre contracts, ATP is used. The cell must keep remaking ATP from food.",
 "Muscle movement, nerve signals, active transport, and building proteins and DNA.",
 ["Instantly usable energy","Works for many different jobs in the cell","Recycled again and again"],
 ["Cannot be stored in large amounts, so it must be made constantly","Making it needs oxygen and fuel","A shortage quickly causes fatigue and cell damage"],
 "ATP = the cell's energy currency.");

eduAdd("glycolysis","biochemistry",["biology"],"Glycolysis",
 ["glycolysis","glycolytic pathway"],
 "Glycolysis is the pathway that splits one glucose (6 carbons) into two pyruvate (3 carbons) in the cytoplasm, making a small amount of ATP and NADH.",
 "Glycolysis is the first stage of burning glucose: it cuts the sugar in half and collects a little energy.",
 ["Energy investment: 2 ATP are used to prepare glucose.","Splitting: the 6-carbon sugar is split into two 3-carbon molecules.","Energy payoff: 4 ATP and 2 NADH are made.","Net result per glucose: 2 ATP, 2 NADH and 2 pyruvate."],
 "In a sprint, muscles run short of oxygen. Pyruvate becomes lactate, and glycolysis keeps supplying ATP quickly.",
 "All cells, red blood cells (which rely on it), working muscle and yeast fermentation.",
 ["Needs no oxygen","Supplies ATP quickly","Happens in almost every cell"],
 ["Low ATP yield: net 2 per glucose","The anaerobic route makes lactate, which contributes to fatigue","Needs NAD⁺ to be regenerated for it to continue"],
 "Glycolysis = glucose → 2 pyruvate + 2 net ATP.");

/* ── CHEMISTRY ── */
eduAdd("chemistry","chemistry",[],"Chemistry",
 ["chemistry"],
 "Chemistry is the science of matter: what substances are made of, how they behave and how they change.",
 "Chemistry explains why iron rusts, why bread rises and why soap cleans.",
 ["Matter is made of atoms and molecules.","Atoms join through chemical bonds.","Substances change in chemical reactions.","Chemists measure and predict these changes with formulas and equations."],
 "Baking soda plus vinegar fizzes. A new substance, carbon dioxide gas, is formed.",
 "Medicine, food, cleaning products, fuels, farming and materials.",
 ["Explains and improves everyday materials","Leads to medicines, fuels and fertilisers","Builds scientific thinking"],
 ["Some chemicals are harmful or polluting","Needs careful safety in practice","Many symbols and rules to learn"],
 "Chemistry = the science of substances and how they change.",
 {overview:true});

eduAdd("atoms","chemistry",["physics"],"Atoms",
 ["atom","atoms","atomic structure","protons neutrons electrons","subatomic particles"],
 "An atom is the smallest unit of an element that keeps its chemical properties. It has a nucleus of protons and neutrons with electrons around it.",
 "An atom is like a tiny solar system: a dense centre with electrons moving around it.",
 ["Protons are positive and in the nucleus; their number is the atomic number.","Neutrons are neutral and in the nucleus.","Electrons are negative and arranged in shells around the nucleus.","In a neutral atom, the number of protons equals the number of electrons."],
 "Carbon has 6 protons, so a neutral carbon atom has 6 electrons arranged as 2 in the first shell and 4 in the second.",
 "Explaining the periodic table, bonding, electricity and nuclear energy.",
 ["The atom model explains properties and reactions","Is the base of chemistry, materials and medicine","Helps predict how elements bond"],
 ["Atoms are too small to see directly, so models are simplified","The full quantum model is complex","Simple shell models fail for heavy atoms"],
 "Atom = nucleus (protons + neutrons) + electrons.");

eduAdd("periodic_table","chemistry",[],"The periodic table",
 ["periodic table","groups and periods","periodic trends","chemical elements"],
 "The periodic table arranges the elements by increasing atomic number so that elements with similar properties line up in the same column (group).",
 "It works like a map of the elements: neighbours in a column behave like family members.",
 ["Rows are called periods; columns are called groups.","Elements in a group have the same number of outer electrons, so they react similarly.","Metals are mostly on the left and centre; non-metals on the right.","Properties such as reactivity and atomic size follow trends across and down the table."],
 "Lithium, sodium and potassium (group 1) all react with water, and the reaction gets more vigorous going down the group.",
 "Predicting reactions, choosing materials and understanding bonding.",
 ["Organises over a hundred elements clearly","Lets you predict properties and reactions","Showed scientists where undiscovered elements might fit"],
 ["Many exceptions to the simple trends","Takes time to learn the symbols and groups","A flat table can hide complex electron behaviour"],
 "Periodic table = elements ordered by atomic number into groups and periods.");

eduAdd("chemical_bonding","chemistry",[],"Chemical bonding",
 ["chemical bond","chemical bonding","ionic bond","ionic bonding","covalent bond","covalent bonding","metallic bond","valence electrons"],
 "A chemical bond is the attraction that holds atoms together in compounds. It forms when electrons are transferred or shared.",
 "Atoms bond like people holding hands: some give a hand (ionic), some share (covalent).",
 ["Atoms bond to reach a full outer shell of electrons.","Ionic bond: electrons transfer, and oppositely charged ions attract (NaCl).","Covalent bond: electrons are shared between atoms (H₂O).","Metallic bond: shared, free-moving electrons hold a metal together."],
 "Sodium gives one electron to chlorine. They become Na⁺ and Cl⁻ ions, and attract to form table salt.",
 "Explaining melting points, conductivity, solubility and how materials are designed.",
 ["Explains why substances have their properties","Helps predict melting point, conductivity and solubility","Guides the design of new materials and drugs"],
 ["Real bonds are rarely purely ionic or covalent","Simple models have many exceptions, such as the octet rule","Needs visualising 3D structures"],
 "Chemical bond = atoms held together by transferred or shared electrons.");

eduAdd("chemical_reactions","chemistry",[],"Chemical reactions",
 ["chemical reaction","chemical reactions","reactants and products","balance a chemical equation","balancing equations","types of reactions"],
 "A chemical reaction rearranges atoms so that reactants turn into new substances called products.",
 "A reaction is like rebuilding with the same bricks: the bricks (atoms) stay, the structure changes.",
 ["Write reactants → products.","Balance the equation so each element has the same number of atoms on both sides.","Identify the type: combination, decomposition, displacement or combustion.","Look for signs: gas, colour change, temperature change or a solid forming."],
 "2H₂ + O₂ → 2H₂O. Four hydrogen atoms and two oxygen atoms on each side, so it is balanced.",
 "Cooking, digestion, batteries, burning fuel, rusting and making medicines.",
 ["Produce useful new materials such as medicines, fuels and fertilisers","Release energy, for example in combustion and batteries","Can be predicted and controlled with equations"],
 ["Some reactions are dangerous or pollute","Some are too slow or need extra energy or a catalyst","Side reactions can waste material"],
 "Chemical reaction = reactants rearrange into products.");

eduAdd("acids_bases","chemistry",["biochemistry"],"Acids, bases and pH",
 ["acid","acids","acids and bases","alkali","alkalis","ph scale","ph"],
 "Acids release hydrogen ions (H⁺) in water. Bases (alkalis, when soluble) accept H⁺ or release hydroxide ions (OH⁻). The pH scale from 0 to 14 shows how acidic or alkaline something is.",
 "pH is like a thermometer for acidity: low numbers are strongly acidic, high numbers are strongly alkaline, and 7 is neutral.",
 ["Test with an indicator or a pH meter.","pH below 7 is acidic, 7 is neutral, above 7 is alkaline.","Acid + base → salt + water (neutralisation).","Each pH step is a tenfold change in hydrogen ion concentration."],
 "Lemon juice has a pH of about 2 (acidic). Soap is about 9 to 10 (basic). Pure water is 7.",
 "Cleaning, food, medicine (antacids), farming (soil pH), swimming pools and enzyme activity in the body.",
 ["Used widely in cleaning, food, medicine and industry","Neutralisation treats indigestion and acidic soil","pH control keeps enzymes and the body working"],
 ["Strong acids and bases burn and corrode","Need careful handling and disposal","Acid rain and pH changes harm lakes, soil and living things"],
 "Acid pH < 7, neutral = 7, base pH > 7.");

eduAdd("organic_chemistry","chemistry",["biochemistry"],"Organic chemistry",
 ["organic chemistry","carbon compounds","functional group","functional groups","hydrocarbon","hydrocarbons","alkane","alkanes","alkene","alkenes"],
 "Organic chemistry studies compounds built on carbon chains and rings, usually with hydrogen, oxygen and nitrogen.",
 "Carbon is like a building block with four connectors, so it can build chains, rings and endless shapes.",
 ["Carbon forms four bonds and bonds with itself.","Hydrocarbons contain only C and H: alkanes have single bonds, alkenes have a double bond.","Functional groups such as –OH, –COOH and –NH₂ decide how a molecule reacts.","Names follow chain length: meth-, eth-, prop-, but-."],
 "Ethanol, CH₃CH₂OH, has an –OH group, which makes it an alcohol.",
 "Fuels, plastics, medicines, food, fabrics and cosmetics.",
 ["Explains fuels, plastics, medicines and food","Huge variety of compounds from one element","Functional groups make behaviour predictable"],
 ["A very large number of compounds and reactions to learn","Naming rules take practice","Some products, like plastics and fossil fuels, pollute"],
 "Organic chemistry = the chemistry of carbon compounds.");

/* ── PHYSICS ── */
eduAdd("physics","physics",[],"Physics",
 ["physics"],
 "Physics is the science that studies matter, energy, motion, forces and how the universe behaves.",
 "Physics asks why things move, fall, heat up, shine and make sound, and answers with measurable rules.",
 ["Observe and measure a quantity.","Find the law that links the quantities.","Express it as an equation.","Test predictions with experiments."],
 "A ball dropped from a table falls because of gravity. Physics lets us calculate how long it takes.",
 "Engineering, electronics, medicine (X-rays, MRI), space travel and energy.",
 ["Explains how nature works","Drives technology such as phones, cars and medical scanners","Builds careful, logical thinking"],
 ["Needs maths to be understood fully","Models are simplified versions of reality","Some topics, such as quantum physics, feel unintuitive"],
 "Physics = the science of matter, energy, motion and forces.",
 {overview:true});

eduAdd("motion","physics",["engineering"],"Motion",
 ["motion","velocity","speed","acceleration","displacement","kinematics","equations of motion"],
 "Motion is a change in position over time. Speed tells how fast; velocity adds direction; acceleration is how quickly velocity changes.",
 "Speed is what the speedometer shows. Acceleration is how hard you are pushed back into the seat.",
 ["Speed = distance ÷ time.","Velocity = displacement ÷ time (it has a direction).","Acceleration = change in velocity ÷ time.","For constant acceleration: v = u + at and s = ut + ½at²."],
 "A car travels 120 km in 2 hours: speed = 60 km/h. A car speeding up from 0 to 20 m/s in 5 s has a = 20 ÷ 5 = 4 m/s².",
 "Vehicle design, sports, traffic safety and space travel.",
 ["Predicts where and when objects will be","Used in vehicle design, sports and space travel","Simple equations for constant acceleration"],
 ["Equations assume constant acceleration","Real motion has friction and air resistance","Mixing up speed and velocity, or the signs, is common"],
 "Motion: speed = distance ÷ time; acceleration = change in velocity ÷ time.");

eduAdd("forces","physics",["engineering"],"Forces and Newton's laws",
 ["force","forces","newtons laws","newton's laws","newtons laws of motion","laws of motion","friction"],
 "A force is a push or a pull that can change an object's motion or shape. It is measured in newtons (N).",
 "Pushing a heavy trolley is hard to start and easy to keep going; the force needed depends on the mass.",
 ["First law: with no net force, an object keeps its motion (inertia).","Second law: force = mass × acceleration (F = ma).","Third law: every action has an equal and opposite reaction.","Add the forces, with direction, to find the net force."],
 "A 10 kg trolley pushed with a net force of 20 N has acceleration a = 20 ÷ 10 = 2 m/s².",
 "Cars and brakes, rockets, sports, bridges and machines.",
 ["Explain and predict the motion of everyday objects","Underpin engineering, vehicles and sports","The laws are simple but powerful"],
 ["Break down at very high speeds (relativity) and very small scales (quantum)","Forces like friction are hard to measure exactly","You need a free-body diagram to avoid mistakes"],
 "Force = mass × acceleration.");

eduAdd("gravity","physics",[],"Gravity",
 ["gravity","gravitation","gravitational force","falling objects","weight and mass"],
 "Gravity is the force of attraction between objects with mass. On Earth it pulls objects toward the centre, giving a falling acceleration of about 9.8 m/s².",
 "Gravity is the invisible pull that keeps your feet on the ground and the Moon circling Earth.",
 ["Anything with mass attracts other mass.","Weight = mass × g, where g ≈ 9.8 N/kg on Earth.","Without air resistance, all objects fall at the same rate.","Gravity keeps planets orbiting the Sun and the Moon orbiting Earth."],
 "A 60 kg person weighs about 60 × 9.8 = 588 N on Earth. On the Moon the weight is about one-sixth of that, but the mass is still 60 kg.",
 "Orbits, tides, falling objects, dams and hydropower, and satellites.",
 ["Keeps us, the oceans and the atmosphere on Earth","Keeps planets and satellites in orbit","Causes tides and makes hydropower possible"],
 ["Makes falls dangerous and lifting heavy things hard","Escaping Earth's gravity needs huge energy","Astronauts in low gravity lose bone and muscle"],
 "Gravity = the attraction between masses; weight = mass × g.");

eduAdd("energy","physics",["engineering","biology","chemistry"],"Energy",
 ["energy","kinetic energy","potential energy","conservation of energy","energy transfer"],
 "Energy is the ability to do work or cause change. It exists in forms such as kinetic, potential, thermal, chemical and electrical, and is measured in joules (J).",
 "Energy is like money that can change currency but is never lost: it only moves from one form to another.",
 ["Identify the form: kinetic energy KE = ½mv², gravitational potential energy PE = mgh.","Energy changes form but is never created or destroyed.","Compare the total energy before and after.","Efficiency = useful energy out ÷ total energy in."],
 "A 2 kg ball held 5 m high has PE = 2 × 9.8 × 5 = 98 J. As it falls, the PE turns into KE.",
 "Power stations, vehicles, food and the human body, heating and batteries.",
 ["Conservation of energy makes many problems easier to solve","Applies in every science","Basis of power generation and engineering"],
 ["Some energy is always wasted as heat","Renewable sources depend on weather or location","Fossil fuel use causes pollution"],
 "Energy = ability to do work; it changes form but is conserved.");

eduAdd("electricity","physics",["engineering"],"Electricity",
 ["electricity","voltage","electric current","resistance","ohms law","ohm's law","circuit","circuits"],
 "Electricity is the flow of electric charge, usually electrons through a conductor. Voltage pushes the charge, current is the flow and resistance opposes it.",
 "Think of water in a pipe: voltage is the pressure, current is the flow of water and resistance is a narrow pipe.",
 ["Voltage V (volts) is the push on the charges.","Current I (amps) is how much charge flows each second.","Resistance R (ohms) opposes the flow.","Ohm's law: V = I × R."],
 "A 12 V battery across a 4 Ω resistor gives a current I = 12 ÷ 4 = 3 A.",
 "Lighting, phones, computers, motors, heating and power grids.",
 ["Easy to transport and convert into light, heat and motion","Clean at the point of use","Powers modern technology"],
 ["Dangerous: it can cause shocks and fires","Hard to store in large amounts","Generation can pollute, depending on the source"],
 "Ohm's law: V = I × R.");

eduAdd("waves","physics",[],"Waves",
 ["wave","waves","sound waves","light waves","wavelength","frequency","amplitude"],
 "A wave transfers energy from one place to another without carrying matter along. Its main features are wavelength, frequency and amplitude.",
 "Drop a stone in a pond: the ripples travel outward, but the water only moves up and down.",
 ["Wavelength is the distance from one crest to the next.","Frequency is the number of waves per second, in hertz (Hz).","Wave speed = frequency × wavelength.","Transverse waves (like light) and longitudinal waves (like sound) move differently."],
 "Sound travels at about 340 m/s. At 170 Hz the wavelength is 340 ÷ 170 = 2 m.",
 "Radio and phones, ultrasound scans, music, earthquakes and sunlight.",
 ["Carry information, as in radio, phones and the internet","Used in medicine, such as ultrasound and X-rays","Explain sound, light and earthquakes"],
 ["Can be absorbed, reflected or blocked, causing a weak signal","Some waves, such as UV and X-rays, can be harmful","Noise is a form of pollution"],
 "Wave speed = frequency × wavelength.");

/* ── BIOLOGY ── */
eduAdd("biology","biology",[],"Biology",
 ["biology","life science"],
 "Biology is the science of living things: how they are built, how they work, grow, reproduce and interact.",
 "Biology looks at life at every size, from a single cell to the whole planet.",
 ["Cells are the basic units of life.","Cells form tissues, organs and organisms.","Genes pass information to the next generation.","Living things interact with each other and their environment in ecosystems."],
 "A leaf is made of cells that capture sunlight, and the whole plant depends on that process.",
 "Medicine, farming, conservation, food and biotechnology.",
 ["Explains health, disease and nature","Leads to medicines, better crops and conservation","Helps us understand ourselves"],
 ["Lots of new vocabulary","Living systems are complex and variable","Some topics need microscopes or lab work"],
 "Biology = the science of life.",
 {overview:true});

eduAdd("cell","biology",["histology","biochemistry"],"Cells",
 ["cell","cells","cell structure","cell membrane","cytoplasm","cell nucleus","mitochondria"],
 "The cell is the basic unit of life. All living things are made of one or more cells.",
 "A cell is like a tiny city: the nucleus is the town hall, mitochondria are the power stations and the membrane is the border control.",
 ["The cell membrane controls what enters and leaves.","The nucleus holds DNA and directs the cell.","The cytoplasm is where reactions happen, and mitochondria release energy.","Plant cells also have a cell wall, chloroplasts and a large vacuole."],
 "Red blood cells carry oxygen. Nerve cells carry signals. Both are specialised for their jobs.",
 "Growth, repair, reproduction, disease diagnosis and biotechnology.",
 ["Being made of cells lets organisms grow and repair themselves","Cells can specialise for different jobs","Cell division makes reproduction and growth possible"],
 ["Cells are too small to see without a microscope","Damaged or out-of-control cells can cause diseases such as cancer","Cell size is limited by surface area compared with volume"],
 "Cell = the basic unit of life.",
 {not:["phone","phones","tower","prison","block","mobile"]});

eduAdd("genetics","biology",["biochemistry"],"Genetics",
 ["genetics","gene","genes","dna","heredity","inheritance","inherited traits","chromosome","chromosomes","allele","alleles"],
 "Genetics is the study of genes, how they are passed from parents to offspring and how they influence traits.",
 "Genes are like recipe cards in a family cookbook, copied and passed down with some mixing.",
 ["DNA carries instructions in units called genes.","Genes sit on chromosomes (humans have 23 pairs).","Each parent gives one copy (allele) of each gene.","A dominant allele shows over a recessive one; a Punnett square predicts the chances."],
 "In pea plants, tall (T) is dominant over short (t). Cross Tt × Tt: the chance of a tall plant is 3 in 4 (75%) and of a short plant 1 in 4 (25%).",
 "Inheritance, genetic testing, medicine, farming and forensic science.",
 ["Explains inheritance and variation","Allows genetic testing, gene therapy and crop improvement","Helps trace ancestry and disease risk"],
 ["Most traits involve many genes and the environment, not one simple rule","Genetic information raises privacy and ethical questions","Mutations can cause genetic disease"],
 "Genetics = how genes pass traits from parents to children.");

eduAdd("digestion","biology",["biochemistry"],"Digestion",
 ["digestion","digestive system","digestive tract","digestive organs","break down food","food digestion"],
 "Digestion is the process of breaking food down into small molecules that the body can absorb and use.",
 "Digestion is like a disassembly line that cuts food into small parts the blood can carry.",
 ["Mouth: chewing and saliva start breaking down food.","Stomach: acid and enzymes continue the breakdown.","Small intestine: most nutrients are absorbed into the blood.","Large intestine: water is absorbed and waste is formed."],
 "Rice is mostly starch. Saliva and pancreatic amylase break it into sugars, and the small intestine absorbs the glucose.",
 "Getting energy and nutrients, nutrition planning and understanding stomach and gut problems.",
 ["Releases the nutrients the body needs","Enzymes make the process fast","Large surface area in the small intestine absorbs efficiently"],
 ["Problems such as ulcers, intolerances and infections upset digestion","Poor diet or too little fibre and water causes problems","Poor digestion limits nutrient absorption"],
 "Digestion = breaking food into absorbable nutrients.");

eduAdd("evolution","biology",[],"Evolution",
 ["evolution","natural selection","adaptation","adaptations","survival of the fittest"],
 "Evolution is the gradual change in the inherited traits of a population over many generations. Natural selection is its main mechanism.",
 "Evolution is like a recipe being slightly changed by each generation, with the best-working versions kept.",
 ["Individuals vary in their traits.","Some traits help survival and reproduction in a given environment.","Those individuals pass on their genes more often.","Over many generations the population changes."],
 "When bacteria are exposed to an antibiotic, resistant ones survive and multiply, so resistance spreads through the population.",
 "Medicine (antibiotic resistance), conservation, farming and understanding the diversity of life.",
 ["Explains the diversity of life","Helps predict antibiotic resistance and guides medicine","Ties all of biology together"],
 ["Happens over long periods, so it is hard to observe directly","Often misunderstood: it is not simply survival of the strongest","Models are simplified and cannot predict exact outcomes"],
 "Evolution = populations change over generations through natural selection.");

eduAdd("ecosystems","biology",[],"Ecosystems",
 ["ecosystem","ecosystems","food chain","food chains","food web","food webs","ecology"],
 "An ecosystem is a community of living things together with their non-living environment, interacting as one system.",
 "An ecosystem is like a neighbourhood where everyone depends on everyone else for food, shelter and clean air.",
 ["Producers, such as plants, make food using sunlight.","Consumers eat producers or other consumers.","Decomposers recycle dead matter into nutrients.","Energy flows one way through the system, while nutrients are recycled."],
 "Grass → grasshopper → frog → snake → eagle is a food chain.",
 "Conservation, farming, fisheries and climate science.",
 ["Provide food, clean air and water","Keep populations in balance","Support a wide variety of species"],
 ["Easily disturbed by pollution, invasive species and climate change","Losing one species can affect many others","Damaged ecosystems recover slowly"],
 "Ecosystem = living things and their environment working together.");

eduAdd("respiration","biology",["biochemistry"],"Cellular respiration",
 ["respiration","cellular respiration","aerobic respiration","anaerobic respiration"],
 "Cellular respiration is the process that releases energy from glucose to make ATP. Aerobic respiration uses oxygen.",
 "Respiration is how cells burn fuel (glucose) to charge their batteries (ATP).",
 ["Glucose + oxygen → carbon dioxide + water + energy (ATP).","Glycolysis happens in the cytoplasm; the mitochondria finish the job.","Without oxygen, glucose becomes lactate (animals) or ethanol and CO₂ (yeast), releasing less energy.","Breathing delivers oxygen and removes carbon dioxide."],
 "During a sprint, muscles use some anaerobic respiration, and lactate builds up. That is part of why muscles feel tired.",
 "Exercise, breathing, brewing and baking (yeast), and understanding fatigue.",
 ["Aerobic respiration releases far more energy (about 30 ATP per glucose compared with 2)","Provides energy for every living cell","Anaerobic respiration works when oxygen is short"],
 ["Aerobic respiration needs a steady oxygen supply","Anaerobic respiration is inefficient and produces lactate","Needs a constant supply of fuel"],
 "Respiration = glucose + oxygen → CO₂ + water + ATP.");

eduAdd("photosynthesis","biology",["biochemistry"],"Photosynthesis",
 ["photosynthesis","photosynthetic","chlorophyll","plants make food"],
 "Photosynthesis is the process by which green plants use light energy to make glucose from carbon dioxide and water, releasing oxygen.",
 "A leaf is a tiny solar-powered kitchen: sunlight is the energy, water and carbon dioxide are the ingredients, glucose is the meal.",
 ["Chlorophyll in the leaves absorbs sunlight.","Roots take in water; leaves take in carbon dioxide through stomata.","Light energy turns water and carbon dioxide into glucose.","Oxygen is released as a by-product."],
 "6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂. A tree uses this to build wood and leaves from air and water.",
 "Food chains, oxygen in the air, crops, and absorbing carbon dioxide.",
 ["Makes food and oxygen for almost all life","Removes carbon dioxide from the air","Stores the sun's energy in food and fuels"],
 ["Needs light, water and carbon dioxide, so drought or shade slows it","Only plants, algae and some bacteria can do it","Rate is limited by temperature and leaf damage"],
 "Photosynthesis = light + CO₂ + water → glucose + oxygen.");

/* ── HISTORY ── */
const EDU_HIST = {advLabel:"Positive effects", disLabel:"Negative effects"};
eduAdd("history","history",[],"History",
 ["history","study of history"],
 "History is the study of past events, people and societies, using evidence to understand what happened and why.",
 "History is like a detective story: historians collect clues (sources) and build the most reliable account.",
 ["Ask a question about the past.","Collect sources: documents, objects, accounts.","Check each source for who made it, when and why.","Explain causes, events and consequences."],
 "A diary, a photograph and a tax record can all be sources that together show how a town lived 200 years ago.",
 "Understanding politics today, law, journalism, museums and education.",
 ["Helps us understand how the present came about","Teaches us to judge evidence and avoid repeating mistakes","Builds critical thinking and writing skills"],
 ["Sources can be biased, incomplete or lost","Interpretations change as new evidence appears","Dates and names take effort to remember"],
 "History = studying the past through evidence.",
 {overview:true, advLabel:"Why it is useful", disLabel:"Challenges", chipJoiner:": "});

eduAdd("revolution","history",[],"Revolution",
 ["revolution","revolutions","social revolution"],
 "A revolution is a major and often rapid change in a society's government, economy or way of life.",
 "A revolution is like a pot boiling over: pressure builds for a long time and then everything changes quickly.",
 ["People become dissatisfied with the existing system.","Leaders and ideas organise the demand for change.","Conflict or protest challenges those in power.","A new system, government or order takes its place."],
 "The French Revolution of 1789 ended the rule of an absolute king and spread ideas of liberty and equality.",
 "Studying politics, change and the causes of conflict.",
 ["Can end unfair or oppressive systems","Can bring new rights, laws and ideas","Can speed up social and economic progress"],
 ["Often involves violence and loss of life","Can cause instability and economic hardship","New rulers may become as harsh as the old ones"],
 "Revolution = a rapid, major change in society or government.",
 EDU_HIST);

eduAdd("french_revolution","history",[],"The French Revolution",
 ["french revolution","revolution of 1789"],
 "The French Revolution (1789–1799) was a period of radical political and social change in France that ended absolute monarchy and spread ideas of liberty and equality.",
 "Imagine a country where most people pay heavy taxes and have little say, then demand a say, and the old order collapses.",
 ["Causes: a debt crisis, an unequal society (three estates), Enlightenment ideas and food shortages.","1789: the Estates-General meets, the Bastille is stormed and the Declaration of the Rights of Man is issued.","The monarchy is abolished (1792), King Louis XVI is executed (1793) and the Reign of Terror follows.","Napoleon Bonaparte takes power in 1799, ending the revolution."],
 "The Declaration of the Rights of Man and of the Citizen (1789) stated that people are born free and equal in rights.",
 "Understanding modern democracy, human rights and political change.",
 ["Ended absolute monarchy and feudal privileges","Spread ideas of liberty, equality and citizens' rights","Influenced democratic movements around the world"],
 ["Violence and the Reign of Terror killed thousands","Years of instability and war followed","It ended in military rule under Napoleon"],
 "French Revolution (1789–1799) = the end of absolute monarchy in France.",
 EDU_HIST);

eduAdd("ww1","history",[],"World War I",
 ["world war 1","world war one","world war i","ww1","wwi","first world war","great war"],
 "World War I (1914–1918) was a global war centred in Europe, fought mainly between the Allied Powers and the Central Powers.",
 "Alliances worked like a chain: when one country was attacked, its partners were pulled in, and the conflict spread.",
 ["Long-term causes: alliances, militarism, imperial rivalry and nationalism.","Trigger: the assassination of Archduke Franz Ferdinand in Sarajevo on 28 June 1914.","The war settled into trench warfare on the Western Front, with new weapons such as machine guns, tanks and poison gas.","It ended with the armistice on 11 November 1918, and the Treaty of Versailles in 1919."],
 "The Battle of the Somme (1916) cost huge numbers of lives for very little ground, showing the horror of trench warfare.",
 "Understanding the causes of modern conflicts, the collapse of empires and the origins of World War II.",
 ["The League of Nations was created to try to keep peace","Women's roles grew, and several countries expanded voting rights","Advances in medicine and technology"],
 ["Millions of soldiers and civilians died","Empires collapsed and borders changed","Harsh peace terms and economic hardship helped lead to World War II"],
 "WWI = 1914–1918 global war triggered by the assassination in Sarajevo.",
 EDU_HIST);

eduAdd("ww2","history",[],"World War II",
 ["world war 2","world war two","world war ii","ww2","wwii","second world war"],
 "World War II (1939–1945) was the largest war in history, fought between the Allies and the Axis powers across Europe, Africa, Asia and the Pacific.",
 "After the first war left bitterness and hardship, aggressive leaders took advantage, and the world was pulled into a second, larger war.",
 ["Causes: resentment of the Treaty of Versailles, economic crisis, the rise of fascism and German expansion.","1939: Germany invades Poland, and Britain and France declare war.","The war spreads, and the USA and the USSR join in 1941.","1945: Germany surrenders in May, and Japan surrenders after the atomic bombings of Hiroshima and Nagasaki."],
 "D-Day (6 June 1944), when Allied forces landed in Normandy, began the liberation of Western Europe.",
 "Understanding the modern world order, human rights and the United Nations.",
 ["The Nazi regime was defeated","The United Nations was founded in 1945","Led to decolonisation movements and scientific advances"],
 ["Tens of millions of people died, including the victims of the Holocaust","Cities and economies were destroyed","The Cold War began between the USA and the USSR"],
 "WWII = 1939–1945 global war between the Allies and the Axis.",
 EDU_HIST);

eduAdd("industrial_revolution","history",[],"The Industrial Revolution",
 ["industrial revolution","industrialisation","industrialization"],
 "The Industrial Revolution (from about 1760, starting in Britain) was the shift from hand production to machines, factories and new energy sources.",
 "It was like going from a small workshop to a giant machine that could produce far more in far less time.",
 ["It began in Britain with textile machines, steam engines, coal and iron.","Factories replaced home-based work, and railways and steamships spread.","People moved from farms to fast-growing cities.","The changes spread to Europe, North America and then the world."],
 "James Watt's improved steam engine, patented in 1769, powered factories and later trains and ships.",
 "Understanding modern economies, cities, technology and environmental change.",
 ["Greater production and cheaper goods","Faster transport and the growth of new jobs","Technology and, over time, higher living standards"],
 ["Harsh working conditions and child labour in many early factories","Pollution and overcrowded, unhealthy cities","Greater inequality and long-term environmental damage"],
 "Industrial Revolution = the shift to machines and factories from about 1760.",
 EDU_HIST);

eduAdd("cold_war","history",[],"The Cold War",
 ["cold war"],
 "The Cold War (about 1947–1991) was a rivalry between the USA and the USSR and their allies that never became a direct full-scale war between them.",
 "It was like a standoff where each side builds up strength and watches the other, without firing the first shot.",
 ["Roots: a clash between capitalism and democracy on one side and communism on the other.","Tools: the nuclear arms race, spying, the space race and proxy wars such as Korea and Vietnam.","Key events: the Berlin Blockade, the Berlin Wall and the Cuban Missile Crisis (1962).","It ended with the fall of the Berlin Wall (1989) and the dissolution of the USSR (1991)."],
 "In the Cuban Missile Crisis (1962), the world came close to nuclear war before the two sides reached an agreement.",
 "Understanding modern international relations and why alliances such as NATO exist.",
 ["It never became a direct war between the superpowers","Spurred scientific progress, including the space race","Led to arms-control agreements"],
 ["Huge military spending and constant fear of nuclear war","Proxy wars cost millions of lives","The world was divided, and many countries were affected"],
 "Cold War = USA–USSR rivalry from about 1947 to 1991.",
 EDU_HIST);

/* ── COMPUTER SCIENCE ── */
eduAdd("computer_science","computer",[],"Computer science",
 ["computer science","computing"],
 "Computer science is the study of computers and computation: how to store, process and communicate information, and how to design software and systems.",
 "It is the science of telling machines exactly what to do, step by step.",
 ["Represent information as data (bits and bytes).","Design algorithms to process it.","Write programs to run those algorithms.","Test and improve the solution."],
 "A map app takes your location (data), uses an algorithm to find the shortest route and shows it on your screen.",
 "Apps, websites, games, banking, healthcare, AI and robotics.",
 ["Automates work and solves large problems quickly","Drives modern technology and many careers","Builds logical, step-by-step thinking"],
 ["Technology changes quickly, so learning never stops","Software bugs and security problems are common","Needs patience and practice"],
 "Computer science = the study of computation, programs and data.",
 {overview:true});

eduAdd("algorithm","computer",["math"],"Algorithms",
 ["algorithm","algorithms","flowchart","pseudocode"],
 "An algorithm is a finite, step-by-step set of instructions for solving a problem or completing a task.",
 "An algorithm is like a recipe: clear steps, in order, that anyone can follow to get the same result.",
 ["Define the input and the output you want.","List clear, ordered steps.","Use decisions (if) and repetition (loops).","Test with examples and improve the efficiency."],
 "To find the largest number in a list: assume the first number is largest, compare it with each next number, keep the bigger one, and the number you keep at the end is the answer.",
 "Search engines, route finding, sorting, recommendations and encryption.",
 ["Gives a clear, repeatable solution","Computers can run it automatically","Can be compared and improved for speed"],
 ["A badly designed algorithm is slow or wrong","Must handle every unusual case","Can copy bias if it is built on biased data"],
 "Algorithm = step-by-step instructions to solve a problem.");

eduAdd("programming","computer",[],"Programming",
 ["programming","coding","code","programming language","programming languages","variables and loops"],
 "Programming is writing instructions in a language that a computer can run.",
 "Programming is like writing a very precise recipe for a very obedient but literal cook.",
 ["Understand the problem.","Plan the steps (an algorithm).","Write the code using variables, conditions, loops and functions.","Run, test and fix bugs."],
 "In Python: for i in range(1, 4): print(i) prints 1, 2 and 3.",
 "Apps, websites, games, data analysis, robots and automation.",
 ["Automates repetitive tasks","Lets you build apps, websites and tools","A valuable and widely useful skill"],
 ["Bugs are common and fixing them takes time","Syntax is strict: one wrong symbol can stop the program","Needs continuous learning as tools change"],
 "Programming = writing instructions that a computer can run.");

eduAdd("ai","computer",[],"Artificial intelligence",
 ["artificial intelligence","ai","machine learning","chatbot","chatbots","deep learning"],
 "Artificial intelligence (AI) is software that performs tasks that normally need human intelligence, such as understanding language or recognising images. Machine learning is a main method, where computers learn patterns from data.",
 "Instead of being told every rule, an AI system learns from many examples, like a student who learns from practice problems.",
 ["Collect data.","Train a model to find patterns in the data.","Test it on new data it has not seen.","Use it to predict or answer, and keep improving with feedback."],
 "A spam filter studies thousands of labelled emails and learns which new emails are probably spam.",
 "Translation, medical imaging, voice assistants, recommendations, education and self-driving research.",
 ["Processes large amounts of data quickly","Can work all day without tiring","Helps in medicine, translation and learning"],
 ["Can be wrong or biased","Needs a lot of data and computing power","Raises privacy and job concerns and needs human oversight"],
 "AI = computers that learn patterns from data to perform smart tasks.");

eduAdd("internet","computer",[],"The internet",
 ["internet","computer network","computer networks","world wide web","www","how the internet works"],
 "The internet is a global network of connected computers and devices that exchange data using shared rules called protocols, such as TCP/IP.",
 "The internet is like a worldwide postal system where messages are split into small parcels and routed to the right address.",
 ["Your device connects through an internet service provider.","Data is split into small packets.","Routers send the packets along the best path.","The receiving device puts them back together. The web (HTTP) is one service that runs on the internet."],
 "When you open a website, your browser asks a server for the page, and the data comes back as packets that your device assembles.",
 "Email, websites, online classes, video calls, banking and cloud storage.",
 ["Instant communication and access to information","Online learning, business and entertainment","Cheap sharing of information"],
 ["Misinformation, cybercrime and privacy risks","Can distract and encourage too much screen time","Not everyone has equal access"],
 "Internet = a worldwide network of connected computers.");

eduAdd("database","computer",[],"Databases",
 ["database","databases","sql","dbms","data storage"],
 "A database is an organised collection of data stored so it can be searched, updated and managed easily.",
 "A database is like a very organised filing cabinet that a computer can search in a split second.",
 ["Data is stored in tables: rows are records, columns are fields.","A primary key uniquely identifies each record.","Tables can be linked using keys (a relational database).","Queries in SQL read or change the data, for example: SELECT name FROM students WHERE grade > 80;"],
 "A school database might have a students table and a courses table, linked by a student ID, so you can see which student takes which course.",
 "Schools, banks, shops, hospitals, social media and websites.",
 ["Fast searching and sorting","Reduces repeated data and errors","Many users can share the same data safely"],
 ["Needs careful design and maintenance","Needs good security to protect private data","Can be costly to run at large scale"],
 "Database = organised data you can search and update quickly.");

eduAdd("cybersecurity","computer",[],"Cybersecurity",
 ["cybersecurity","cyber security","computer security","password security","phishing","malware"],
 "Cybersecurity is the practice of protecting computers, networks and data from attacks, theft and damage.",
 "Cybersecurity is like locking your house: strong locks, careful visitors and an alarm.",
 ["Know the common threats: malware, phishing and weak passwords.","Use strong, unique passwords and two-factor authentication.","Keep software updated and use antivirus and firewalls.","Be careful with links and attachments, and back up your data."],
 "A fake email from your bank asks you to click a link and enter your password. That is phishing. Go to the bank's real website yourself instead.",
 "Banking, online shopping, school systems, businesses and personal accounts.",
 ["Protects personal and business data","Builds trust in online services","Reduces financial loss and disruption"],
 ["Costs time and money","Security steps can feel inconvenient","No system is ever 100% secure"],
 "Cybersecurity = protecting systems and data from attacks.");

/* ── HISTOLOGY ── */
eduAdd("histology","histology",["biology"],"Histology",
 ["histology","tissue","tissues","types of tissue","types of tissues"],
 "Histology is the study of tissues under the microscope: how cells and their surroundings are arranged and how that structure relates to function.",
 "Histology is like looking at the fabric of the body under a magnifying glass.",
 ["There are four basic tissue types: epithelial, connective, muscle and nervous.","A tissue sample is fixed, cut into thin slices and stained (H&E: nuclei blue-purple, cytoplasm pink).","Look at the layers, cell shape, matrix and fibres under the microscope.","Link what you see to the tissue's function."],
 "The surface of skin shows many flat cell layers (stratified squamous epithelium), which gives protection.",
 "Medical diagnosis (biopsies), cancer detection, anatomy teaching and research.",
 ["Shows how structure relates to function","Essential for diagnosing diseases such as cancer","Teaches anatomy at the cellular level"],
 ["Preparing slides can cause artefacts such as shrinkage and folds","A slide shows a thin 2D slice of a 3D structure","Needs training to interpret stains and patterns"],
 "Histology = the study of tissues under the microscope.",
 {overview:true});

eduAdd("epithelial_tissue","histology",["biology"],"Epithelial tissue",
 ["epithelial tissue","epithelium","epithelial cells"],
 "Epithelial tissue covers body surfaces, lines cavities and forms glands. Its cells sit tightly together on a basement membrane with very little matrix between them.",
 "Epithelium is the body's wallpaper and filter: it covers surfaces and controls what passes through.",
 ["Count the layers: simple (one layer) or stratified (many layers).","Look at the cell shape: squamous (flat), cuboidal or columnar.","Look for special features: cilia, microvilli, goblet cells.","Match to function: protection, absorption, secretion or filtration."],
 "The lining of the small intestine is simple columnar epithelium with microvilli, which is ideal for absorbing nutrients.",
 "Skin, the lining of the gut and airways, glands and kidney tubules.",
 ["Forms a protective barrier","Regenerates quickly","Controls absorption and secretion"],
 ["Has no blood vessels, so cells depend on diffusion from below","Exposed surfaces are easily damaged or infected","Rapid cell division increases the risk of cancers (carcinomas)"],
 "Epithelium = tightly packed cells covering and lining surfaces.");

eduAdd("connective_tissue","histology",["biology"],"Connective tissue",
 ["connective tissue","extracellular matrix"],
 "Connective tissue supports, connects and protects other tissues. Its cells are scattered in an extracellular matrix of fibres and ground substance.",
 "Connective tissue is the body's packing and scaffolding: it holds things in place and gives strength.",
 ["Cells: fibroblasts, fat cells and others live in the matrix.","Fibres: collagen (strength), elastic fibres (stretch) and reticular fibres (support).","Ground substance fills the spaces between cells and fibres.","Types include loose, dense, cartilage, bone, blood and adipose (fat) tissue."],
 "A tendon is dense regular connective tissue, with parallel collagen fibres that carry the pull from muscle to bone.",
 "Tendons, ligaments, bone, cartilage, fat and blood.",
 ["Gives strength and support","Binds and protects organs","Stores energy (fat) and transports materials (blood)"],
 ["Some types, such as cartilage, heal slowly because of poor blood supply","Collagen disorders weaken the body","Too much fibrous tissue leads to scarring (fibrosis)"],
 "Connective tissue = cells in a matrix that support and connect.");

eduAdd("muscle_tissue","histology",["biology"],"Muscle tissue",
 ["muscle tissue","skeletal muscle","cardiac muscle","smooth muscle"],
 "Muscle tissue is made of cells that can contract to produce movement. The three types are skeletal, cardiac and smooth muscle.",
 "Muscle cells are tiny engines that shorten when told to, using ATP as fuel.",
 ["Skeletal muscle: striated, voluntary, with many nuclei at the edge of long fibres.","Cardiac muscle: striated, involuntary, with one central nucleus and intercalated discs.","Smooth muscle: not striated, involuntary, with one central nucleus and spindle-shaped cells.","Contraction is powered by actin and myosin filaments and ATP."],
 "Skeletal muscle moves your arm, cardiac muscle keeps your heart beating, and smooth muscle moves food along your gut.",
 "Movement, heartbeat, digestion and blood vessel control.",
 ["Produces movement and force","Cardiac muscle works without tiring","Smooth muscle controls organs automatically"],
 ["Needs a constant supply of oxygen and energy","Skeletal muscle injuries take time to heal","Cardiac muscle damaged by a heart attack cannot regenerate well"],
 "Muscle tissue = cells that contract: skeletal, cardiac and smooth.");

eduAdd("nervous_tissue","histology",["biology"],"Nervous tissue",
 ["nervous tissue","neuron","neurons","nerve cells"],
 "Nervous tissue is made of neurons, which carry electrical signals, and supporting glial cells. It forms the brain, spinal cord and nerves.",
 "Neurons are like electrical wires that carry messages quickly around the body.",
 ["A neuron has a cell body, dendrites (receive signals) and an axon (sends signals).","Signals travel as electrical impulses along the axon.","At a synapse, chemical messengers pass the signal to the next cell.","Glial cells support, insulate and protect neurons."],
 "When you touch something hot, sensory neurons send a signal to the spinal cord, and motor neurons make your hand pull away.",
 "Reflexes, thinking, memory, senses and controlling muscles.",
 ["Very fast communication","Coordinates the whole body","Allows learning and memory"],
 ["Mature neurons rarely divide, so damage is hard to repair","Needs a constant supply of oxygen and glucose","Diseases such as Parkinson's and Alzheimer's affect it"],
 "Nervous tissue = neurons and glia that carry signals.");

/* ── ADVANCED ENZYMOLOGY ── */
eduAdd("enzyme_kinetics","enzymology",["biochemistry"],"Enzyme kinetics",
 ["enzyme kinetics","michaelis menten","michaelis-menten","vmax","km value"],
 "Enzyme kinetics studies how fast enzyme-catalysed reactions run and how the rate depends on substrate concentration, enzyme concentration, temperature, pH and inhibitors.",
 "Think of a queue at a ticket desk: at first more people mean more tickets per minute, but once the desk is working flat out, more people do not make it faster.",
 ["Measure the initial rate v at different substrate concentrations [S].","Fit the Michaelis–Menten equation: v = Vmax[S] ÷ (Km + [S]).","Vmax is the maximum rate; Km is the [S] at which the rate is half of Vmax.","A Lineweaver–Burk plot (1/v against 1/[S]) turns the curve into a straight line."],
 "An enzyme with Vmax = 100 µmol/min and Km = 2 mM runs at 50 µmol/min when [S] = 2 mM.",
 "Comparing enzymes, drug design, diagnostics and understanding metabolism.",
 ["Gives measurable constants (Km and Vmax) to compare enzymes","Helps in drug design and understanding metabolism","Shows how enzymes respond to conditions"],
 ["Assumes steady state and a single substrate","Test-tube conditions differ from the crowded cell","Lineweaver–Burk plots distort errors at low rates"],
 "Enzyme kinetics: v = Vmax[S] ÷ (Km + [S]).");

eduAdd("enzyme_inhibition","enzymology",["biochemistry"],"Enzyme inhibition",
 ["enzyme inhibition","enzyme inhibitor","enzyme inhibitors","competitive inhibition","noncompetitive inhibition","non-competitive inhibition","uncompetitive inhibition"],
 "Enzyme inhibition is when a molecule (an inhibitor) lowers enzyme activity. The main types are competitive, non-competitive and uncompetitive inhibition.",
 "A competitive inhibitor is like a wrong key that fits the lock but does not turn: it blocks the real key.",
 ["Competitive: the inhibitor competes with the substrate at the active site; Vmax stays the same and Km increases.","Non-competitive: it binds elsewhere on the enzyme; Vmax decreases and Km stays the same.","Uncompetitive: it binds only the enzyme-substrate complex; both Vmax and Km decrease.","Inhibition can be reversible or irreversible."],
 "Statins competitively inhibit HMG-CoA reductase, which lowers cholesterol production in the liver.",
 "Medicines, poisons, metabolic control and feedback regulation.",
 ["A natural way for cells to regulate metabolism (feedback)","Basis of many drugs, such as statins and antibiotics","Helps reveal how an enzyme works"],
 ["Unwanted inhibition causes poisoning, for example cyanide blocking cytochrome oxidase","Drugs can have side effects","Resistance to inhibitor drugs can develop"],
 "Inhibition = a molecule reduces enzyme activity (competitive, non-competitive, uncompetitive).");

eduAdd("enzyme_mechanism","enzymology",["biochemistry"],"Enzyme mechanism",
 ["enzyme mechanism","enzyme catalysis","activation energy","transition state"],
 "An enzyme mechanism is the step-by-step description of how an enzyme turns substrate into product, including how it lowers the activation energy.",
 "An enzyme works like a skilled helper who holds two pieces in just the right position so they join easily.",
 ["The substrate binds to the active site (induced fit).","Catalytic groups stabilise the transition state, which lowers the activation energy.","Common strategies: acid-base catalysis, covalent catalysis, metal ions, and bringing substrates close in the right orientation.","The product is released and the enzyme is regenerated."],
 "Chymotrypsin is a serine protease. A catalytic triad of Ser, His and Asp lets it cut peptide bonds through an acyl-enzyme intermediate.",
 "Drug design, enzyme engineering and understanding disease.",
 ["Knowing the mechanism guides drug design","Explains an enzyme's speed and specificity","Allows enzymes to be engineered for industry"],
 ["Hard to work out: needs structures and kinetic data","Details differ between enzymes","Models simplify real, dynamic molecules"],
 "Enzyme mechanism = how binding, catalysis and release lower the activation energy.");

/* ── PURINE AND PYRIMIDINE BIOSYNTHESIS ── */
eduAdd("purine_pathway","purine_pyrimidine",["biochemistry"],"Purine biosynthesis",
 ["purine biosynthesis","purine pathway","purine synthesis","purines"],
 "Purine biosynthesis builds the purine ring (adenine and guanine) step by step on a ribose-5-phosphate backbone, producing IMP first.",
 "It is like building a model directly on a base plate: the ring is assembled atom by atom on the sugar phosphate.",
 ["PRPP is made from ribose-5-phosphate.","PRPP amidotransferase (the committed step) makes 5-phosphoribosylamine.","The ring is built using glycine, glutamine, aspartate, formyl-THF and CO₂, giving IMP.","IMP branches to AMP and GMP, and these end products feed back to inhibit the pathway."],
 "Fast-dividing cells need many purines for DNA and RNA, so some anticancer drugs, such as methotrexate, target this pathway by reducing folate (THF) supply.",
 "Making DNA and RNA, understanding gout, and cancer and immune-suppressing drugs.",
 ["Lets cells build nucleotides from simple precursors","Tightly regulated by feedback","A target for medicines"],
 ["Uses a lot of energy (many ATP)","Needs folate and several amino acids","Defects or overproduction cause diseases such as gout"],
 "Purine synthesis: PRPP → IMP → AMP and GMP.");

eduAdd("pyrimidine_pathway","purine_pyrimidine",["biochemistry"],"Pyrimidine biosynthesis",
 ["pyrimidine biosynthesis","pyrimidine pathway","pyrimidine synthesis","pyrimidines"],
 "Pyrimidine biosynthesis builds the pyrimidine ring first, from carbamoyl phosphate and aspartate, and then attaches it to ribose (from PRPP). This is the opposite order to purines.",
 "Here the ring is built first and then attached to the sugar, like making a part and then fitting it onto the frame.",
 ["Carbamoyl phosphate synthetase II makes carbamoyl phosphate from glutamine, CO₂ and ATP (the main regulated step in animals).","Aspartate transcarbamoylase adds aspartate, and the ring then closes to form orotate.","PRPP is attached to give OMP, which is decarboxylated to UMP.","UMP becomes UTP and then CTP; thymidylate synthase makes dTMP."],
 "In orotic aciduria, UMP synthase is defective. Orotate builds up in urine, and treatment uses uridine.",
 "Making DNA and RNA, cancer drugs (such as 5-fluorouracil) and understanding inherited metabolic disorders.",
 ["Supplies the nucleotides needed for DNA and RNA","Regulated to match the cell's needs","A target for medicines"],
 ["Needs glutamine, aspartate and ATP","Defects lead to metabolic diseases","Drug targets can also harm healthy dividing cells"],
 "Pyrimidine synthesis: ring first, then ribose; UMP → UTP → CTP.");

/* ── CHOLESTEROL ── */
eduAdd("cholesterol","cholesterol",["biochemistry"],"Cholesterol",
 ["cholesterol","ldl","hdl","good cholesterol","bad cholesterol","clinical cholesterol"],
 "Cholesterol is a waxy sterol lipid found in cell membranes. It is also used to make steroid hormones, bile acids and vitamin D.",
 "Cholesterol is like a building material that is also the raw material for several important messengers.",
 ["Cells make cholesterol, and some comes from food.","It keeps cell membranes stable and flexible.","It is converted into steroid hormones, bile acids and vitamin D.","LDL carries cholesterol to tissues; HDL carries it back to the liver."],
 "A person with high LDL cholesterol may have fatty deposits (plaques) forming in artery walls, which raises heart disease risk.",
 "Heart health checks, nutrition advice, hormone production and drug treatment (statins).",
 ["Keeps cell membranes stable","Raw material for hormones, bile and vitamin D","Made by the body, so it is not required from food"],
 ["High LDL cholesterol promotes atherosclerosis","Excess can form gallstones","Diet, genes (such as familial hypercholesterolaemia) and lifestyle can raise levels"],
 "Cholesterol = a sterol lipid needed for membranes and hormones.",
 {overview:true});

eduAdd("cholesterol_synthesis","cholesterol",["biochemistry"],"Cholesterol biosynthesis",
 ["cholesterol synthesis","cholesterol biosynthesis","hmg coa reductase","mevalonate pathway"],
 "Cholesterol biosynthesis is a multi-step pathway that starts with acetyl-CoA and makes cholesterol (27 carbons) in the cytoplasm and endoplasmic reticulum.",
 "It is like a long assembly line that starts with small 2-carbon pieces and builds a large ring structure.",
 ["Acetyl-CoA is converted to HMG-CoA.","HMG-CoA reductase makes mevalonate (the rate-limiting step; uses NADPH).","Mevalonate becomes isoprene units, which join to form squalene (30 carbons).","Squalene cyclises to lanosterol, which is converted into cholesterol."],
 "Statins inhibit HMG-CoA reductase, which reduces mevalonate and therefore cholesterol production.",
 "Understanding statin drugs, heart disease and steroid hormone production.",
 ["Lets the body make cholesterol when diet gives too little","Produces intermediates that are used for other molecules","A clear drug target (HMG-CoA reductase)"],
 ["Uses a lot of energy and NADPH","Overproduction contributes to high blood cholesterol","Blocking it can cause side effects, such as muscle problems with statins"],
 "Cholesterol synthesis: acetyl-CoA → HMG-CoA → mevalonate → squalene → cholesterol.");

eduAdd("cholesterol_regulation","cholesterol",["biochemistry"],"Cholesterol regulation",
 ["cholesterol regulation","regulate cholesterol","regulation of cholesterol","srebp"],
 "Cholesterol synthesis is regulated so cells can balance cholesterol production with what is available from food and from the blood.",
 "It works like a thermostat: when cholesterol is high, production switches down; when low, it switches up.",
 ["Low cell cholesterol activates SREBP-2, which turns on genes for HMG-CoA reductase and the LDL receptor.","High cholesterol blocks SREBP-2 activation and speeds up the breakdown of HMG-CoA reductase.","AMPK phosphorylates and inactivates HMG-CoA reductase when energy is low.","Insulin promotes synthesis; glucagon reduces it."],
 "After a meal rich in cholesterol, liver cells make less of their own, which helps keep levels balanced.",
 "Treating high cholesterol, statins and understanding inherited cholesterol disorders.",
 ["Keeps cholesterol in a safe range","Responds to diet and hormones","Gives drug targets for lowering cholesterol"],
 ["Control can fail in inherited conditions such as familial hypercholesterolaemia","Regulation is complex","Drugs that act on it can have side effects"],
 "Regulation = feedback by SREBP-2, enzyme degradation and hormones.");

/* ── ENGINEERING ── */
eduAdd("engineering","engineering",["physics"],"Engineering",
 ["engineering","engineers"],
 "Engineering is the use of science, maths and creativity to design, build and improve things that solve real problems.",
 "An engineer is a problem solver who turns scientific ideas into things that work safely.",
 ["Define the problem and the limits (cost, safety, materials).","Use science and maths to model the situation.","Design, build and test a solution.","Improve it based on the results."],
 "To design a bridge, engineers calculate the loads, choose materials, test a model and add a safety margin.",
 "Buildings, roads, machines, electronics, software and medical devices.",
 ["Solves real problems and improves daily life","Combines creativity with science and maths","Many career paths"],
 ["Must balance cost, safety and performance","Mistakes can have serious consequences","Needs teamwork and constant learning"],
 "Engineering = applying science and maths to solve practical problems.",
 {overview:true});

eduAdd("free_body_diagrams","engineering",["physics"],"Free-body diagrams",
 ["free body diagram","free body diagrams","free-body diagram","free-body diagrams","force diagram"],
 "A free-body diagram isolates an object and shows all the external forces acting on it as arrows.",
 "It is like drawing a snapshot of just one object and every push or pull acting on it.",
 ["Choose the object and draw it as a dot or box.","Draw an arrow for each force: weight, normal force, friction, tension and any applied force.","Choose axes, and split angled forces into components.","Write F = ma along each axis and solve."],
 "A 5 kg box on a flat floor is pulled by a 20 N horizontal rope, with 5 N of friction. Net force = 20 − 5 = 15 N, so a = 15 ÷ 5 = 3 m/s².",
 "Designing structures, machines, vehicles and solving mechanics problems.",
 ["Makes complicated force problems clear","Prevents missing forces","Works for any object, from a box to a bridge"],
 ["Easy to forget a force or draw it in the wrong direction","Need to resolve angled forces into components","Assumes you can treat the object as a single point or rigid body"],
 "Free-body diagram = one object plus every force acting on it.");

eduAdd("engineering_calculations","engineering",["physics"],"Engineering calculations",
 ["engineering calculation","engineering calculations","governing equation","safety factor"],
 "Engineering calculations use physical laws and equations to design or check real systems, with correct units and safety margins.",
 "They connect the real object to the right equation, so you calculate with reasons rather than guesses.",
 ["Define the problem: what is known, what is unknown.","Choose the relevant law or equation and state your assumptions.","Keep the units consistent and calculate.","Check if the result is reasonable and apply a safety factor."],
 "A cable that can carry 10 kN, with a safety factor of 2, should be used for loads of at most 5 kN.",
 "Bridges, machines, electrical circuits, pipes and aircraft.",
 ["Predict performance before building","Improve safety and save cost","Give reasons for design decisions"],
 ["Results depend on the assumptions made","Wrong units or data give wrong answers","Real systems are often more complex than the model"],
 "Engineering calculations = right equation, right units, reasonable result.");

eduAdd("practical_problem_solving","engineering",["physics"],"Practical problem solving",
 ["practical problem solving","practical engineering","engineering design","design process","engineering problem solving","constraints and assumptions"],
 "Practical problem solving in engineering connects theory to a real system by defining the problem, making a model, testing and improving.",
 "It is like fixing a bike: understand what is broken, try a fix, test it, and improve.",
 ["Describe the real situation and the goal.","List constraints (cost, size, safety) and assumptions.","Build a model or prototype and test it.","Improve the design using the results."],
 "To keep a classroom cooler, you might compare shading, ventilation and fans by testing how each changes the temperature, then choose the best low-cost option.",
 "Product design, repairs, construction, renewable energy and everyday troubleshooting.",
 ["Leads to practical, workable solutions","Builds creativity and logical thinking","Reduces risk by testing before final use"],
 ["Can take time and several attempts","Needs clear information about the problem","Constraints often force trade-offs"],
 "Define → model → test → improve.");


/* ══ MATHEMATICS BATCH 2 — secondary school and university ══ */

/* ── Secondary school ── */
eduAdd("straight_line_graphs","math",[],"Straight-line graphs",
 ["straight line graph","straight line graphs","equation of a straight line","gradient and intercept","linear graph","linear graphs","gradient","coordinate geometry","coordinates"],
 "A straight-line graph shows a linear relationship. Its equation is y = mx + c, where m is the gradient (steepness) and c is the y-intercept (where the line crosses the y-axis).",
 "Think of a hill: the gradient says how steep it is, and the intercept says the height where you start.",
 ["Gradient m = change in y ÷ change in x (rise over run).","The y-intercept c is the value of y when x = 0.","Write the line as y = mx + c.","Parallel lines have the same gradient; perpendicular lines have gradients that multiply to −1."],
 "Through (0, 1) and (2, 5): gradient = (5 − 1) ÷ (2 − 0) = 2, intercept = 1, so y = 2x + 1.",
 "Taxi fares, phone bills, speed-time graphs and any steady rate of change.",
 ["Shows a rate of change clearly","Easy to predict new values","Basis for algebra and calculus"],
 ["Only describes steady, linear change","Reading values from a hand-drawn graph is not exact","Sign and fraction mistakes in the gradient are common"],
 "Straight line: y = mx + c.");

eduAdd("factorisation","math",[],"Factorisation and expanding brackets",
 ["factorisation","factorization","factorise","factorize","factorising","factorizing","expanding brackets","expand brackets","expanding and factorising","difference of two squares"],
 "Expanding removes brackets by multiplying out. Factorising is the reverse: writing an expression as a product of brackets.",
 "Expanding is unpacking a box; factorising is packing the items back into the box.",
 ["Expand: multiply each term in one bracket by each term in the other, for example (x + 2)(x + 3) = x² + 5x + 6.","Factorise: look for a common factor first.","For x² + bx + c, find two numbers that multiply to c and add to b.","Check by expanding your answer."],
 "Factorise x² + 5x + 6: the numbers that multiply to 6 and add to 5 are 2 and 3, so x² + 5x + 6 = (x + 2)(x + 3). Difference of two squares: x² − 9 = (x − 3)(x + 3).",
 "Solving quadratic equations, simplifying fractions and algebra in science.",
 ["Makes quadratic equations easy to solve","Simplifies long expressions","Shows the structure of an expression"],
 ["Needs good times-table and sign skills","Not every expression factorises neatly","Easy to make sign mistakes"],
 "Expand = multiply out; factorise = write as a product.");

eduAdd("interest","math",[],"Simple and compound interest",
 ["simple interest","compound interest","interest rate","interest rates","compound growth","depreciation"],
 "Interest is the money paid for borrowing, or earned by saving. Simple interest is calculated on the original amount only; compound interest is calculated on the amount plus the interest already earned.",
 "Compound interest is like a snowball: it grows faster because the interest earns interest.",
 ["Simple interest: I = P × r × t (principal × rate × time).","Compound interest: A = P(1 + r)ⁿ, where n is the number of periods.","Interest earned = final amount − original amount.","Use r as a decimal (5% = 0.05)."],
 "$1000 at 10% a year for 2 years. Simple: 1000 × 0.10 × 2 = $200. Compound: 1000 × 1.1² = $1210, so interest = $210.",
 "Savings, loans, mortgages, investments and population growth.",
 ["Helps you plan savings and compare loans","Compound interest rewards long-term saving","The formula also models growth and decay"],
 ["Compound interest makes debts grow quickly","Rates and periods are easy to mix up","Real banks may add fees"],
 "Simple: I = Prt. Compound: A = P(1 + r)ⁿ.");

eduAdd("speed_distance_time","math",["physics"],"Speed, distance and time",
 ["speed distance time","distance speed time","speed formula","average speed","distance time graph","distance time graphs"],
 "Speed tells how fast something moves: speed = distance ÷ time. The same formula can be rearranged to find distance or time.",
 "Use the triangle trick: put D on top and S and T at the bottom. Cover what you want to find.",
 ["Speed = distance ÷ time.","Distance = speed × time.","Time = distance ÷ speed.","Keep the units consistent (km with hours, m with seconds)."],
 "A bus travels 150 km in 2.5 hours: speed = 150 ÷ 2.5 = 60 km/h. At 60 km/h for 3 hours the distance is 180 km.",
 "Travel planning, sport, road safety and aviation.",
 ["Simple and useful in daily life","Lets you plan journeys","Basis for velocity and acceleration"],
 ["Average speed hides stops and speed changes","Mixed units cause errors","Real journeys are rarely at constant speed"],
 "Speed = distance ÷ time.");

eduAdd("surds","math",[],"Surds",
 ["surd","surds","rationalising the denominator","rationalise denominator","simplifying surds","irrational roots"],
 "A surd is a root that cannot be written as an exact fraction, such as √2 or √5. Surds are kept in root form to stay exact.",
 "√2 is like an exact measurement that a calculator can only approximate as 1.414…",
 ["Simplify by taking out square factors: √12 = √(4 × 3) = 2√3.","Multiply: √a × √b = √(ab).","Add like surds only: 2√3 + 5√3 = 7√3.","Rationalise a denominator by multiplying top and bottom by the root."],
 "√50 = √(25 × 2) = 5√2. Rationalise 1/√3: multiply by √3/√3 to get √3/3.",
 "Geometry (Pythagoras), trigonometry, physics and engineering.",
 ["Gives exact answers without rounding","Keeps calculations accurate","Needed for exact trigonometric values"],
 ["Harder to picture than decimals","Rules are easy to misapply","Calculators often show only approximations"],
 "Surd = an exact root that is not a whole number or fraction.");

eduAdd("permutations_combinations","math",[],"Permutations and combinations",
 ["permutation","permutations","combination","combinations","factorial","counting principle","ncr","npr","arrangements and selections"],
 "Permutations count the ways to arrange items when order matters. Combinations count the ways to choose items when order does not matter.",
 "A lock code is a permutation (order matters). A team picked from a class is a combination (order does not matter).",
 ["Factorial: n! = n × (n − 1) × … × 1.","Permutations: nPr = n! ÷ (n − r)!.","Combinations: nCr = n! ÷ (r!(n − r)!).","Ask: does order matter? Yes uses permutations, no uses combinations."],
 "Choose 2 students from 5: 5C2 = 5! ÷ (2! × 3!) = 10. Arrange 2 of 5 in order: 5P2 = 20.",
 "Passwords, lotteries, team selection, probability and scheduling.",
 ["Counts possibilities without listing them","Needed for probability","Used in computing and statistics"],
 ["Numbers grow very quickly","Choosing between permutation and combination causes mistakes","Repeated items need extra care"],
 "Permutation = order matters; combination = order does not matter.");

eduAdd("congruence_similarity","math",[],"Congruence and similarity",
 ["congruent triangles","congruent","congruence","similar triangles","similar shapes","similarity","scale factor"],
 "Congruent shapes are exactly the same size and shape. Similar shapes have the same shape, but one is an enlargement of the other.",
 "Congruent is like two photocopies at the same size; similar is like the same photo printed small and large.",
 ["Triangles are congruent if they satisfy SSS, SAS, ASA (AAS) or RHS.","Similar shapes have equal angles and sides in the same ratio (the scale factor).","Lengths multiply by the scale factor k; areas by k²; volumes by k³.","Use the ratio to find missing sides."],
 "Two similar triangles with sides 3, 4, 5 and 6, 8, 10 have scale factor 2. Their areas are in the ratio 1 : 4.",
 "Maps and models, architecture, photography and shadows.",
 ["Finds lengths that cannot be measured directly","Basis of scale drawings and maps","Proves geometry results"],
 ["Needs correct matching of corresponding sides","Area and volume scale differently, which confuses beginners","Diagrams may not be drawn to scale"],
 "Congruent = identical; similar = same shape, different size.");

eduAdd("circle_theorems","math",[],"Circle theorems",
 ["circle theorem","circle theorems","angle in a semicircle","angle at the centre","tangent to a circle","cyclic quadrilateral","chord"],
 "Circle theorems are rules about angles and lines in circles, used to find missing angles.",
 "They are like shortcuts: spot the pattern in the circle and the angle is known immediately.",
 ["The angle in a semicircle is 90°.","The angle at the centre is twice the angle at the circumference on the same arc.","Angles in the same segment are equal.","Opposite angles of a cyclic quadrilateral add to 180°; a tangent meets the radius at 90°."],
 "If the angle at the circumference is 35°, the angle at the centre on the same arc is 70°.",
 "Geometry proofs, design, engineering and exam problems.",
 ["Gives quick answers for angle problems","Trains logical proof","Links to trigonometry"],
 ["Many rules to remember","Needs careful reading of the diagram","Easy to apply the wrong rule"],
 "Circle theorems = rules for angles in circles.");

eduAdd("transformations","math",[],"Geometric transformations",
 ["geometric transformations","transformation","transformations","transformations in maths","reflection rotation translation enlargement","translation and enlargement"],
 "A transformation changes the position or size of a shape. The four main types are reflection, rotation, translation and enlargement.",
 "Think of sliding, flipping, turning or zooming a picture on your phone.",
 ["Reflection: flips the shape over a mirror line.","Rotation: turns it about a point by an angle.","Translation: slides it by a vector, without turning.","Enlargement: scales it by a scale factor from a centre."],
 "Translate the point (2, 3) by the vector (4, −1): the new point is (6, 2).",
 "Animation, computer graphics, design, robotics and patterns.",
 ["Describes movement precisely","Basis of computer graphics","Helps understand symmetry"],
 ["Rotations and enlargements need a centre, which is easy to forget","Describing a transformation fully needs several details","Hard to picture without a diagram"],
 "Transformations: reflect, rotate, translate, enlarge.");

eduAdd("bearings","math",[],"Bearings",
 ["bearing","bearings","three figure bearings","compass bearings"],
 "A bearing is a direction measured clockwise from north, written as three digits (for example 045°).",
 "Imagine standing facing north and turning clockwise to face where you want to go.",
 ["Always measure from north.","Always measure clockwise.","Write three digits: 5° is 005°.","The back bearing differs by 180°."],
 "East is 090°, south is 180°, west is 270°. If A is on a bearing of 060° from B, the bearing of B from A is 240°.",
 "Navigation, ships and aircraft, hiking and surveying.",
 ["Gives exact directions","Used with trigonometry to find distances","Standard in navigation"],
 ["Mixing up the starting point causes errors","Needs accurate angle measurement","Back bearings confuse beginners"],
 "Bearing = angle clockwise from north, in three digits.");

eduAdd("binomial_theorem","math",[],"Binomial theorem",
 ["binomial theorem","binomial expansion","pascals triangle","pascal's triangle","expand brackets to a power"],
 "The binomial theorem gives a formula for expanding (a + b)ⁿ without multiplying out repeatedly.",
 "Pascal's triangle is the pattern of coefficients, built by adding the two numbers above.",
 ["Rows of Pascal's triangle give the coefficients: 1, 2, 1 then 1, 3, 3, 1 and so on.","(a + b)ⁿ = Σ nCr aⁿ⁻ʳ bʳ.","Powers of a go down while powers of b go up.","Use it to find a particular term quickly."],
 "(x + 2)³ = x³ + 3x²(2) + 3x(2²) + 2³ = x³ + 6x² + 12x + 8.",
 "Algebra, probability (binomial distribution) and approximations.",
 ["Expands large powers quickly","Links algebra, counting and probability","Gives approximations"],
 ["Arithmetic grows long for large n","Signs go wrong with negative terms","Needs nCr notation"],
 "Binomial theorem: expand (a + b)ⁿ using nCr coefficients.");

eduAdd("binary_numbers","math",["computer"],"Number bases and binary",
 ["binary","binary numbers","number bases","hexadecimal","denary","base 2","base 10"],
 "A number base says how many digits a counting system uses. We use base 10 (denary); computers use base 2 (binary), with only 0 and 1.",
 "Binary is like a row of light switches: each one is either off (0) or on (1).",
 ["In binary, place values are 1, 2, 4, 8, 16, … from the right.","To convert binary to denary, add the place values with a 1.","To convert denary to binary, keep dividing by 2 and read the remainders upward.","Hexadecimal (base 16) uses 0–9 and A–F as a shorter way to write binary."],
 "Binary 1011 = 8 + 0 + 2 + 1 = 11. Denary 13 = 8 + 4 + 1 = 1101 in binary.",
 "Computers, digital electronics, networking and data storage.",
 ["Matches how computers store information","Simple on/off logic","Hex shortens long binary numbers"],
 ["Binary numbers get long","Hard for people to read","Conversions need practice"],
 "Binary = counting in base 2 using 0 and 1.");

eduAdd("correlation_regression","math",[],"Correlation and regression",
 ["correlation","regression","line of best fit","scatter graph","scatter graphs","scatter plot","scatter diagram"],
 "Correlation describes how two variables are related. A line of best fit (regression line) shows the trend and can be used for predictions.",
 "If ice-cream sales and temperature both rise together, the scatter graph slopes upward.",
 ["Plot the data as a scatter graph.","Describe the correlation: positive, negative or none.","Draw the line of best fit through the trend.","Use the line to estimate values, with caution outside the data range."],
 "Study hours and test marks that rise together show positive correlation. Using the line, 5 hours might predict a mark of about 70.",
 "Science, economics, medicine, weather and business forecasting.",
 ["Shows relationships in data","Allows predictions","Easy to read visually"],
 ["Correlation does not prove one thing causes the other","Predictions outside the data can be unreliable","Outliers distort the line"],
 "Correlation = how two variables move together.");

/* ── University / advanced ── */
eduAdd("limits_continuity","math",[],"Limits and continuity",
 ["limits and continuity","limit of a function","limits in calculus","continuity","continuous function","continuous functions","one sided limit"],
 "A limit is the value a function approaches as the input gets closer to a point. A function is continuous at a point if the limit equals the value there, with no jump or break.",
 "Walk toward a door: the limit is the door you are heading to, even if you never stand exactly on it.",
 ["Write lim x→a f(x) = L.","Check the left-hand and right-hand limits; they must agree.","Continuous at a means f(a) exists, the limit exists and they are equal.","Use algebra, factorising or L'Hôpital's rule for 0/0 forms."],
 "lim x→2 (x² − 4) ÷ (x − 2): factorise to (x − 2)(x + 2) ÷ (x − 2) = x + 2, so the limit is 4.",
 "Defining derivatives and integrals, analysis and modelling.",
 ["The foundation of calculus","Handles values where a function is undefined","Makes ideas like infinity precise"],
 ["Abstract at first","The formal ε–δ definition is hard","Some limits need special techniques"],
 "Limit = the value a function approaches.");

eduAdd("differentiation_rules","math",[],"Differentiation rules",
 ["chain rule","product rule","quotient rule","differentiation rules","rules of differentiation","implicit differentiation"],
 "Differentiation rules let you find derivatives of complicated functions by breaking them into simpler parts.",
 "They are a toolbox: each rule is for a different kind of combination of functions.",
 ["Product rule: d(uv) = u′v + uv′.","Quotient rule: d(u/v) = (u′v − uv′) ÷ v².","Chain rule: d f(g(x)) = f′(g(x)) × g′(x).","Common derivatives: d(sin x) = cos x, d(eˣ) = eˣ, d(ln x) = 1/x."],
 "Differentiate (3x + 1)⁴ with the chain rule: 4(3x + 1)³ × 3 = 12(3x + 1)³.",
 "Physics, engineering, economics and machine learning.",
 ["Handle any combination of functions","Allow exact rates of change","Support optimisation"],
 ["Many rules to remember","Long expressions invite mistakes","Choosing the right rule takes practice"],
 "Product, quotient and chain rules extend differentiation.");

eduAdd("integration_techniques","math",[],"Integration techniques",
 ["integration by parts","integration by substitution","u substitution","definite integral","definite integrals","techniques of integration","partial fractions"],
 "Integration techniques are methods for integrating functions that cannot be integrated with a simple rule.",
 "Substitution undoes the chain rule; integration by parts undoes the product rule.",
 ["Substitution: let u = g(x), replace dx and integrate in u.","By parts: ∫u dv = uv − ∫v du.","Partial fractions: split a fraction into simpler ones.","Definite integrals: evaluate F(b) − F(a) after integrating."],
 "∫2x(x² + 1)³ dx: let u = x² + 1, du = 2x dx, so the integral is u⁴/4 + C = (x² + 1)⁴/4 + C.",
 "Areas, physics, probability and engineering.",
 ["Solve many integrals exactly","Reverse the differentiation rules","Needed in physics and engineering"],
 ["Choosing a method needs practice","Algebra gets long","Some integrals have no neat answer"],
 "Substitution and parts reverse the chain and product rules.");

eduAdd("optimisation","math",[],"Maxima, minima and optimisation",
 ["optimisation","optimization","maximum and minimum","maxima and minima","turning points","stationary points","stationary point"],
 "Optimisation uses derivatives to find the greatest or smallest value of something, such as maximum profit or minimum cost.",
 "On a hill, the top is where the slope is flat (zero) before it goes downhill.",
 ["Write the quantity to optimise as a function.","Differentiate and set f′(x) = 0 to find stationary points.","Use the second derivative: f″ < 0 is a maximum, f″ > 0 is a minimum.","Check the answer makes sense in the problem."],
 "Maximise area with 40 m of fence: for a rectangle, A = x(20 − x), A′ = 20 − 2x = 0, so x = 10 and A = 100 m² (a square).",
 "Business profit, engineering design, packaging and machine learning.",
 ["Finds best solutions exactly","Applies to many real problems","Saves cost and materials"],
 ["Needs the problem written as a function","Only finds local, not always global, extremes","Constraints add complexity"],
 "Optimisation: solve f′(x) = 0 and test the result.");

eduAdd("differential_equations","math",["physics","engineering"],"Differential equations",
 ["differential equation","differential equations","separable equations","first order differential equation","second order differential equation"],
 "A differential equation links a function to its derivatives. Solving it means finding the function that satisfies the relationship.",
 "It describes the rule of change, like 'the faster it grows, the more it grows', and the solution is the whole story.",
 ["Identify the order (highest derivative) and type.","Separable: move y terms with dy and x terms with dx, then integrate both sides.","Linear first order: use an integrating factor.","Use initial conditions to find the constants."],
 "dy/dx = 2y: separate dy/y = 2 dx, integrate to ln y = 2x + C, so y = Ae²ˣ. Population growth follows this pattern.",
 "Population models, circuits, vibrations, cooling and finance.",
 ["Model real change over time","Predict future behaviour","Used throughout physics and engineering"],
 ["Many have no exact solution","Different types need different methods","Initial conditions must be known"],
 "Differential equation = an equation involving a function and its derivatives.");

eduAdd("partial_derivatives","math",[],"Partial derivatives and multivariable calculus",
 ["partial derivative","partial derivatives","multivariable calculus","multiple integrals","double integral","gradient vector"],
 "Partial derivatives measure how a function of several variables changes when one variable changes and the others stay fixed.",
 "On a hillside, the slope depends on the direction you walk; a partial derivative picks east-west or north-south.",
 ["For f(x, y), ∂f/∂x treats y as a constant.","∂f/∂y treats x as a constant.","The gradient vector (∂f/∂x, ∂f/∂y) points in the steepest direction.","Double integrals add up values over a region."],
 "f(x, y) = x²y: ∂f/∂x = 2xy and ∂f/∂y = x².",
 "Physics, economics, machine learning (gradient descent) and engineering.",
 ["Handles functions of many variables","Needed for optimisation in many dimensions","Basis of machine learning"],
 ["Harder to visualise","More notation and rules","Computation can be long"],
 "Partial derivative = change with respect to one variable at a time.");

eduAdd("taylor_series","math",[],"Taylor and Maclaurin series",
 ["taylor series","maclaurin series","power series","taylor expansion","series expansion"],
 "A Taylor series writes a function as an infinite sum of terms built from its derivatives at a point. A Maclaurin series is the case at x = 0.",
 "It is like approximating a curve with a polynomial that matches its height, slope and bend.",
 ["Taylor: f(x) = Σ f⁽ⁿ⁾(a)(x − a)ⁿ ÷ n!.","Maclaurin: use a = 0.","Common series: eˣ = 1 + x + x²/2! + x³/3! + …","Truncate after a few terms for an approximation."],
 "sin x ≈ x − x³/6 for small x. At x = 0.1: 0.1 − 0.000167 ≈ 0.099833, very close to the true value.",
 "Calculators, physics approximations and numerical methods.",
 ["Approximates hard functions with simple polynomials","Used inside calculators and computers","Helps solve equations"],
 ["Only accurate near the chosen point","May not converge for all x","Needs many derivatives"],
 "Taylor series = a function as an infinite polynomial.");

eduAdd("complex_numbers","math",["engineering"],"Complex numbers",
 ["complex number","complex numbers","imaginary number","imaginary numbers","argand diagram","imaginary unit"],
 "A complex number has the form a + bi, where i is the imaginary unit with i² = −1.",
 "Real numbers sit on a line; complex numbers fill a whole plane, with a real axis and an imaginary axis.",
 ["a is the real part and b is the imaginary part.","Add and subtract the real and imaginary parts separately.","Multiply as brackets and use i² = −1.","The modulus is √(a² + b²), the distance from the origin."],
 "(2 + 3i)(1 − i) = 2 − 2i + 3i − 3i² = 2 + i + 3 = 5 + i.",
 "Electrical engineering (AC circuits), signal processing, quantum physics and control.",
 ["Solve equations with no real roots","Describe waves and rotations neatly","Essential in engineering"],
 ["Abstract at first","The imaginary part cannot be measured directly in daily life","Sign errors with i²"],
 "Complex number = a + bi, where i² = −1.");

eduAdd("linear_algebra","math",["engineering"],"Linear algebra and vector spaces",
 ["linear algebra","vector space","vector spaces","linear independence","basis and dimension","linear transformation","linear transformations","matrix inverse"],
 "Linear algebra studies vectors, matrices and the linear relationships between them, including vector spaces and linear transformations.",
 "It is the maths of 'straight' relationships, and it powers graphics, data analysis and AI.",
 ["A vector space is a set of vectors you can add and scale.","Vectors are linearly independent if none is a combination of the others.","A basis is a minimal set that spans the space; its size is the dimension.","Matrices represent linear transformations; Ax = b is a system of equations."],
 "In 2D, the vectors (1, 0) and (0, 1) form a basis, and (3, 4) = 3(1, 0) + 4(0, 1).",
 "Computer graphics, data science, machine learning, physics and economics.",
 ["Solves large systems efficiently","Basis of data science and AI","Unifies many parts of maths"],
 ["Very abstract at first","Large matrices need a computer","Many definitions to learn"],
 "Linear algebra = vectors, matrices and linear transformations.");

eduAdd("eigenvalues","math",["engineering","physics"],"Eigenvalues and eigenvectors",
 ["eigenvalue","eigenvalues","eigenvector","eigenvectors","eigen values","characteristic equation"],
 "An eigenvector of a matrix A is a non-zero vector whose direction does not change when A acts on it; it is only scaled by a number λ, the eigenvalue: Av = λv.",
 "Stretch a rubber sheet: lines along certain directions only stretch, never turn; those are the eigenvectors.",
 ["Solve det(A − λI) = 0 to find the eigenvalues λ.","For each λ, solve (A − λI)v = 0 to find the eigenvector.","The sum of the eigenvalues is the trace; their product is the determinant.","Use them to simplify matrix powers and systems."],
 "A = [2 0; 0 3] has eigenvalues 2 and 3 with eigenvectors (1, 0) and (0, 1).",
 "Vibration analysis, Google PageRank, quantum mechanics, data science (PCA) and stability studies.",
 ["Simplify complicated transformations","Reveal natural directions and frequencies","Basis of PCA and many algorithms"],
 ["Hard to compute by hand for large matrices","Not all matrices have real eigenvalues","Abstract"],
 "Eigenvector: Av = λv.");

eduAdd("laplace_fourier","math",["engineering"],"Laplace and Fourier transforms",
 ["laplace transform","laplace transforms","fourier series","fourier transform","fourier transforms","frequency domain"],
 "Transforms convert a function into another form that is easier to work with. Laplace transforms solve differential equations; Fourier methods break a signal into sine and cosine waves.",
 "A Fourier transform is like hearing a chord and identifying each separate note inside it.",
 ["Laplace: L{f(t)} = ∫₀^∞ f(t)e⁻ˢᵗ dt turns calculus into algebra.","Solve the algebra in the s-domain, then transform back.","Fourier series write a periodic signal as a sum of sines and cosines.","Fourier transforms extend this to non-periodic signals."],
 "L{1} = 1/s and L{eᵃᵗ} = 1/(s − a). A square wave can be built from sine waves of increasing frequency.",
 "Electrical engineering, audio and image compression, control systems and vibrations.",
 ["Turn hard differential equations into algebra","Reveal the frequency content of signals","Used everywhere in signal processing"],
 ["Heavy algebra","Need tables and inverse transforms","Concepts are abstract"],
 "Transforms turn hard problems into easier ones in another domain.");

eduAdd("normal_distribution","math",[],"Normal distribution",
 ["normal distribution","bell curve","gaussian distribution","standard normal","z score","z-score","standard normal distribution"],
 "The normal distribution is a symmetric, bell-shaped probability distribution described by its mean μ and standard deviation σ.",
 "Heights of adults cluster around an average, with fewer very short and very tall people.",
 ["The curve is symmetric about the mean.","About 68% of values lie within 1σ, 95% within 2σ and 99.7% within 3σ.","Standardise with z = (x − μ) ÷ σ.","Look up z in a table or use a calculator for probabilities."],
 "Marks have mean 60 and σ = 10. A mark of 80 has z = (80 − 60) ÷ 10 = 2, which is higher than about 97.7% of students.",
 "Exam marks, measurement errors, quality control and many natural measurements.",
 ["Models many real measurements","Easy to calculate with z-scores","Foundation of statistics"],
 ["Real data is often not perfectly normal","Outliers can distort it","Misused when the data is skewed"],
 "Normal distribution = symmetric bell curve defined by μ and σ.");

eduAdd("binomial_distribution","math",[],"Binomial distribution",
 ["binomial distribution","binomial probability","bernoulli trial","bernoulli trials"],
 "The binomial distribution gives the probability of a certain number of successes in a fixed number of independent trials, each with the same chance of success.",
 "Toss a coin 10 times: how likely are exactly 6 heads? That is binomial.",
 ["Check: fixed n trials, two outcomes, constant probability p, independent trials.","P(X = k) = nCk × pᵏ × (1 − p)ⁿ⁻ᵏ.","Mean = np; variance = np(1 − p).","Add probabilities for 'at most' or 'at least' questions."],
 "Fair coin, n = 3, P(exactly 2 heads) = 3C2 × 0.5² × 0.5 = 3 × 0.125 = 0.375.",
 "Quality control, surveys, medicine trials and games.",
 ["Simple formula for repeated yes/no events","Gives exact probabilities","Mean and variance are easy"],
 ["Needs independent trials with the same probability","Large n makes the calculation long","Not suitable when p changes"],
 "Binomial: P(X = k) = nCk pᵏ(1 − p)ⁿ⁻ᵏ.");

eduAdd("hypothesis_testing","math",[],"Hypothesis testing",
 ["hypothesis test","hypothesis testing","hypothesis tests","null hypothesis","p value","p-value","significance level","t test","t-test","chi squared test"],
 "Hypothesis testing is a method for deciding, using sample data, whether there is enough evidence to reject an assumption (the null hypothesis).",
 "Like a courtroom: the null hypothesis is 'innocent until proven guilty', and the data is the evidence.",
 ["State the null hypothesis H₀ and the alternative H₁.","Choose a significance level, often 5%.","Calculate the test statistic and the p-value.","If p is less than the significance level, reject H₀; otherwise do not reject it."],
 "A coin is claimed fair. Out of 100 tosses it lands heads 70 times. The p-value is very small, so there is strong evidence the coin is not fair.",
 "Medical trials, quality control, psychology, business and research.",
 ["Gives a clear rule for decisions","Reduces guessing","Standard in research"],
 ["A small p-value does not prove the claim is true","Results depend on sample size","Easy to misinterpret"],
 "Hypothesis test: compare p-value with the significance level.");

eduAdd("mathematical_proof","math",[],"Mathematical proof and induction",
 ["mathematical induction","proof by induction","mathematical proof","proof by contradiction","direct proof","proofs"],
 "A mathematical proof is a logical argument that shows a statement is always true. Induction proves a statement for all whole numbers.",
 "Induction is like dominoes: if the first falls and each one knocks over the next, they all fall.",
 ["Direct proof: start from known facts and reason step by step.","Contradiction: assume the statement is false and show this is impossible.","Induction, step 1: show it is true for n = 1 (the base case).","Induction, step 2: assume it is true for n = k and prove it for n = k + 1."],
 "Prove 1 + 2 + … + n = n(n + 1)/2. Base case n = 1: 1 = 1. If true for k, adding k + 1 gives (k + 1)(k + 2)/2, so it is true for k + 1.",
 "Higher maths, computer science (algorithms) and logic.",
 ["Gives certainty, not just examples","Builds careful reasoning","Foundation of advanced maths"],
 ["Needs abstract thinking","Writing clear proofs takes practice","Examples alone are never a proof"],
 "Proof = a logical argument that a statement is always true.");

eduAdd("numerical_methods","math",["computer","engineering"],"Numerical methods",
 ["numerical methods","numerical method","newton raphson","newton-raphson","bisection method","trapezium rule","trapezoidal rule","iteration","iterative methods"],
 "Numerical methods find approximate answers to problems that cannot be solved exactly, usually by repeating a calculation until it is accurate enough.",
 "It is like guessing a number and improving the guess each time until it is close enough.",
 ["Rewrite the problem so you can improve a guess.","Newton–Raphson: xₙ₊₁ = xₙ − f(xₙ) ÷ f′(xₙ).","Trapezium rule: estimate an area by trapezia.","Stop when two successive answers agree to the accuracy needed."],
 "Solve x² − 2 = 0 starting at x = 1.5: x₁ = 1.5 − (0.25 ÷ 3) = 1.4167, which is close to √2 = 1.4142.",
 "Engineering, computers, weather forecasting and science.",
 ["Solve problems with no exact formula","Computers can do it quickly","Accuracy can be chosen"],
 ["Answers are approximate","A bad starting guess may fail","Needs many repeated calculations"],
 "Numerical methods = approximate answers by repeated improvement.");

/* ══════════════ ENGLISH LANGUAGE AND LITERATURE — part 1: grammar, vocabulary, writing ══════════════ */
const EN_W = {advLabel:"Why it matters", disLabel:"Common mistakes", chipJoiner:": "};

/* ── Grammar ── */
eduAdd("english_overview","english",[],"English Language and Literature",
 ["english","english language","english literature","english studies"],
 "English as a school and university subject covers language skills (grammar, vocabulary, reading, writing, speaking) and literature (understanding and analysing poems, plays and prose).",
 "Language is the toolbox; literature is what people build with it.",
 ["Grammar and vocabulary: how words and sentences work.","Reading comprehension: understanding and interpreting texts.","Writing: essays, letters, reports and summaries.","Literature: analysing poetry, drama and prose, and the ideas in them."],
 "Reading a short story, finding its theme, and writing a paragraph that explains it with evidence uses all four areas together.",
 "Exams, university study, jobs, communication, law, journalism and everyday life.",
 ["Opens opportunities in study and work","Improves thinking and communication","Helps you understand other people's ideas"],
 ["Rushing without planning","Ignoring grammar and punctuation","Writing opinions without evidence"],
 "English = language skills plus the study of literature.",
 Object.assign({overview:true}, EN_W));

eduAdd("parts_of_speech","english",[],"Parts of speech",
 ["parts of speech","word classes","types of words","eight parts of speech"],
 "Parts of speech are the categories of words by their job in a sentence. English has eight main ones: noun, pronoun, verb, adjective, adverb, preposition, conjunction and interjection.",
 "Words are like members of a team, and each has a role.",
 ["Noun: names a person, place, thing or idea.","Pronoun: replaces a noun (he, she, it, they).","Verb: shows an action or state; adjective describes a noun; adverb describes a verb, adjective or adverb.","Preposition links a noun to another word; conjunction joins words or clauses; interjection shows sudden feeling."],
 "In 'The tired girl quickly ran to school,' girl is a noun, tired an adjective, quickly an adverb, ran a verb, to a preposition and school a noun.",
 "Writing correct sentences, editing and exam grammar questions.",
 ["Helps you build and check sentences","Makes it easier to learn other languages","Needed for analysing writing"],
 ["Many words can be more than one part of speech","Judging a word by itself instead of by its job in the sentence","Confusing adjectives and adverbs"],
 "Eight parts of speech: noun, pronoun, verb, adjective, adverb, preposition, conjunction, interjection.", EN_W);

eduAdd("nouns","english",[],"Nouns",
 ["noun","nouns","common noun","proper noun","abstract noun","collective noun","countable and uncountable nouns"],
 "A noun is a word that names a person, place, thing or idea.",
 "If you can put 'the' in front of it and it makes sense, it is likely a noun.",
 ["Common nouns name general things (city, teacher).","Proper nouns name specific ones and start with a capital (Lagos, Mary).","Abstract nouns name ideas or feelings (honesty, fear); collective nouns name groups (team, flock).","Countable nouns can be counted (books); uncountable cannot (water, advice)."],
 "In 'The team showed great courage,' team is a collective noun and courage is an abstract noun.",
 "Every sentence, since nearly every sentence needs a noun.",
 ["Help you name and describe anything","Basis of subjects and objects in sentences","Needed for correct plurals and articles"],
 ["Forgetting capital letters on proper nouns","Using 'advices' or 'informations' (uncountable)","Wrong plural forms such as 'childs' instead of children"],
 "Noun = a naming word.", EN_W);

eduAdd("pronouns","english",[],"Pronouns",
 ["pronoun","pronouns","personal pronouns","relative pronouns","reflexive pronouns","possessive pronouns"],
 "A pronoun takes the place of a noun so we do not repeat it.",
 "Pronouns are shortcuts: instead of saying 'Amina' again and again, you say 'she'.",
 ["Personal: I, you, he, she, it, we, they (subject) and me, him, her, us, them (object).","Possessive: mine, yours, his, hers, ours, theirs.","Reflexive: myself, himself, themselves.","Relative: who, whom, whose, which, that."],
 "'Amina lost her book, so she borrowed mine.' Her is possessive, she is a subject pronoun, mine is a possessive pronoun.",
 "Writing smoothly, avoiding repetition and keeping meaning clear.",
 ["Make writing shorter and smoother","Avoid repeating nouns","Show who does and receives actions"],
 ["Using 'me' as subject: say 'Ben and I went', not 'Ben and me went'","Unclear reference: it is not clear which noun the pronoun means","Mixing 'its' and 'it's'"],
 "Pronoun = a word that replaces a noun.", EN_W);

eduAdd("verbs","english",[],"Verbs",
 ["verb","verbs","action verbs","linking verbs","auxiliary verbs","helping verbs","modal verbs","transitive and intransitive verbs","regular and irregular verbs"],
 "A verb shows an action, an event or a state of being. Every complete sentence needs a verb.",
 "The verb is the engine of the sentence.",
 ["Action verbs: run, write, think.","Linking verbs connect the subject to a description: be, seem, become.","Auxiliary (helping) verbs such as is, have and will help form tenses; modal verbs such as can, must and should show ability or necessity.","Regular verbs add -ed in the past; irregular verbs change form (go → went)."],
 "'She has been studying all night.' Studying is the main verb; has and been are auxiliary verbs.",
 "Forming tenses, questions and every complete sentence.",
 ["Make sentences complete","Show time through tenses","Show attitude through modal verbs"],
 ["Wrong irregular forms (goed, buyed)","Subject and verb not agreeing","Mixing tenses within a sentence"],
 "Verb = an action or state word.", EN_W);

eduAdd("adjectives_adverbs","english",[],"Adjectives and adverbs",
 ["adjective","adjectives","adverb","adverbs","comparative and superlative","degrees of comparison"],
 "Adjectives describe nouns and pronouns. Adverbs describe verbs, adjectives or other adverbs, and often end in -ly.",
 "An adjective answers 'what kind?'; an adverb answers 'how?', 'when?' or 'where?'.",
 ["Adjective: a tall boy, a red car.","Adverb: runs quickly, very tall, almost finished.","Comparatives compare two (taller); superlatives compare three or more (tallest).","Use 'more' and 'most' with long adjectives (more beautiful)."],
 "'She sings beautifully.' (adverb modifies sings) versus 'She has a beautiful voice.' (adjective modifies voice).",
 "Descriptive writing, comparing things and polishing sentences.",
 ["Make writing vivid and precise","Allow comparison","Show how and when things happen"],
 ["Using an adjective instead of an adverb ('He runs quick')","Double comparatives ('more taller')","Overusing 'very'"],
 "Adjective describes a noun; adverb describes a verb, adjective or adverb.", EN_W);

eduAdd("prepositions_conjunctions","english",[],"Prepositions and conjunctions",
 ["preposition","prepositions","conjunction","conjunctions","coordinating conjunctions","subordinating conjunctions","fanboys"],
 "Prepositions show relationships of place, time or direction (in, on, at, under). Conjunctions join words, phrases or clauses (and, but, because).",
 "Prepositions are like road signs; conjunctions are like bridges.",
 ["Place: in the box, on the table, under the bed.","Time: at 5 o'clock, on Monday, in June.","Coordinating conjunctions (for, and, nor, but, or, yet, so) join equal parts.","Subordinating conjunctions (because, although, when, if) introduce a dependent clause."],
 "'I stayed at home because it was raining, but I still studied.' At is a preposition; because and but are conjunctions.",
 "Joining ideas, writing longer sentences and giving directions.",
 ["Connect ideas clearly","Allow complex, flowing sentences","Show time and place exactly"],
 ["Wrong preposition (in/on/at confusions)","Run-on sentences with no conjunction","Starting a sentence with a conjunction without a complete thought"],
 "Preposition shows relationship; conjunction joins ideas.", EN_W);

eduAdd("tenses","english",[],"Tenses",
 ["tense","tenses","present tense","past tense","future tense","present perfect","past perfect","continuous tense","simple present","simple past","verb tenses"],
 "Tense shows when an action happens: in the past, present or future. Each can be simple, continuous or perfect.",
 "Tenses are a timeline for your verbs.",
 ["Simple present: habits and facts (She walks).","Simple past: finished actions (She walked).","Continuous: ongoing actions (She is walking / was walking).","Perfect: links times (She has walked / had walked); future: will walk."],
 "'I have lived here for five years' (present perfect) tells you I still live here. 'I lived here for five years' (simple past) tells you I do not any more.",
 "Storytelling, reporting, exams and everyday speaking.",
 ["Make timing clear","Prevent confusion in stories and reports","Needed for correct, natural English"],
 ["Mixing tenses in one paragraph","Using present perfect with a finished time ('I have seen him yesterday')","Wrong irregular past forms"],
 "Tense = when something happens.", EN_W);

eduAdd("subject_verb_agreement","english",[],"Subject-verb agreement",
 ["subject verb agreement","subject-verb agreement","concord","agreement of subject and verb"],
 "Subject-verb agreement means the verb must match its subject in number: singular subjects take singular verbs and plural subjects take plural verbs.",
 "They must be in step, like dance partners.",
 ["Find the subject (who or what does the action).","Singular subject → singular verb (She runs).","Plural subject → plural verb (They run).","Ignore extra words between subject and verb; collective nouns usually take singular verbs."],
 "'The box of chocolates is on the table.' The subject is box (singular), not chocolates.",
 "Correct writing in exams and formal work.",
 ["Makes sentences correct and clear","Signals good command of English","A frequent exam requirement"],
 ["Matching the verb to the nearest noun, not the true subject","Mistakes with 'each', 'everyone' and 'neither' (singular)","Confusion with 'there is' and 'there are'"],
 "The verb must match the number of its subject.", EN_W);

eduAdd("active_passive","english",[],"Active and passive voice",
 ["active voice","passive voice","active and passive","active and passive voice","change to passive","passive sentences"],
 "In the active voice the subject does the action. In the passive voice the subject receives the action.",
 "Active: the dog chased the cat. Passive: the cat was chased by the dog.",
 ["Identify the subject, verb and object in the active sentence.","Move the object to the front as the new subject.","Use a form of 'be' plus the past participle.","Add 'by + the doer' only if it matters."],
 "Active: The teacher marked the exams. Passive: The exams were marked by the teacher.",
 "Formal writing, science reports, news and exams.",
 ["Passive is useful when the doer is unknown or unimportant","Active is clear and direct","Choosing wisely improves style"],
 ["Overusing the passive makes writing weak","Wrong form of 'be' or the participle","Forgetting that tense must stay the same"],
 "Active: subject does the action; passive: subject receives it.", EN_W);

eduAdd("reported_speech","english",[],"Direct and indirect speech",
 ["direct speech","indirect speech","reported speech","direct and indirect speech","change to indirect speech"],
 "Direct speech gives the exact words someone said, in quotation marks. Indirect (reported) speech tells what was said without quoting.",
 "Direct speech plays the recording; reported speech tells the story of what was said.",
 ["Direct: She said, \"I am tired.\"","Remove the quotation marks and add 'that'.","Shift the tense back one step (am → was) and change pronouns.","Change time words (today → that day, tomorrow → the next day)."],
 "Direct: He said, \"I will come tomorrow.\" Indirect: He said that he would come the next day.",
 "Writing news and stories, and exam transformation questions.",
 ["Lets you report what others said","Avoids long quotations","Needed in formal writing"],
 ["Forgetting to change the tense or pronouns","Keeping 'tomorrow' and 'today' unchanged","Leaving quotation marks in reported speech"],
 "Reported speech = what was said, without the exact words.", EN_W);

eduAdd("conditionals","english",[],"Conditional sentences",
 ["conditional sentence","conditional sentences","conditionals","if clauses","if clause","first conditional","second conditional","third conditional","zero conditional"],
 "Conditional sentences talk about a condition and its result, usually with if.",
 "If this happens, then that happens.",
 ["Zero: facts (If you heat ice, it melts).","First: real future possibility (If it rains, I will stay).","Second: unlikely or imaginary present (If I were rich, I would travel).","Third: imaginary past (If I had studied, I would have passed)."],
 "'If I had left earlier, I would have caught the bus.' (third conditional: it did not happen).",
 "Speaking, writing and exam grammar.",
 ["Express plans, warnings and imagination","Add precision to meaning","Useful in argument and advice"],
 ["Using 'will' in the if-clause ('If it will rain')","Wrong tense combinations","Saying 'if I was' where 'if I were' is more formal"],
 "Conditionals: if + condition → result.", EN_W);

eduAdd("sentences_clauses","english",[],"Sentences, clauses and phrases",
 ["sentence","sentences","clause","clauses","phrase","phrases","simple sentence","compound sentence","complex sentence","types of sentences","sentence structure","independent clause","dependent clause"],
 "A sentence is a group of words with a subject and a verb that makes complete sense. A clause has a subject and verb; a phrase does not.",
 "A clause is a mini-sentence; a phrase is a group of words that works as one part.",
 ["Simple sentence: one independent clause.","Compound sentence: two independent clauses joined by a coordinating conjunction.","Complex sentence: an independent clause plus a dependent clause.","A fragment is incomplete; a run-on joins clauses without correct punctuation."],
 "'I stayed home, and she went out' is compound. 'I stayed home because it rained' is complex.",
 "Writing varied, correct sentences and analysing texts.",
 ["Gives variety to your writing","Helps avoid fragments and run-ons","Shows your level of control"],
 ["Sentence fragments (no main verb or incomplete thought)","Comma splices (joining two sentences with only a comma)","All sentences the same length and pattern"],
 "Sentence = complete thought; clause = subject + verb.", EN_W);

eduAdd("punctuation","english",[],"Punctuation",
 ["punctuation","comma","commas","apostrophe","apostrophes","full stop","semicolon","semicolons","colon","quotation marks","capital letters","question mark","exclamation mark","hyphen","dash"],
 "Punctuation marks organise writing and make the meaning clear.",
 "Punctuation is like traffic signs: it tells the reader when to pause, stop or notice.",
 ["Full stop ends a statement; question mark ends a question; exclamation mark shows strong feeling.","Comma separates items in a list, and clauses; apostrophe shows possession (Ali's book) or missing letters (don't).","Colon introduces a list or explanation; semicolon joins two closely related sentences.","Capital letters begin sentences and proper nouns; quotation marks enclose exact speech."],
 "'Let's eat, Grandma!' and 'Let's eat Grandma!' mean very different things, and the comma is the difference.",
 "All writing, exams and professional communication.",
 ["Prevents misunderstanding","Makes writing easy to read","Shows care and accuracy"],
 ["Comma splices","Apostrophe errors, such as 'its' and 'it's' or using one for a plural","Missing capitals and full stops"],
 "Punctuation = marks that organise writing and meaning.", EN_W);

eduAdd("commonly_confused_words","english",[],"Commonly confused words and spelling",
 ["commonly confused words","homophones","their there theyre","affect effect","its and its","spelling","spelling rules","confused words"],
 "Some words sound alike or look alike but differ in meaning and spelling. Learning the pairs avoids frequent mistakes.",
 "A quick memory trick fixes most of them.",
 ["their (belonging to them), there (place), they're (they are).","its (belonging to it), it's (it is or it has).","affect (verb: to influence), effect (noun: a result).","Rule of thumb: 'i before e, except after c' has exceptions, so check unfamiliar words."],
 "'They're taking their books over there.' uses all three correctly.",
 "Exams, essays, emails and CVs.",
 ["Shows accuracy and professionalism","Prevents changes in meaning","Builds a good impression in writing"],
 ["Relying only on spell-check, which cannot catch real-word errors","Guessing instead of checking","Mixing 'then' and 'than', 'your' and 'you're'"],
 "Check meaning, not just sound.", EN_W);

eduAdd("prefixes_suffixes","english",[],"Prefixes and suffixes",
 ["prefix","prefixes","suffix","suffixes","word formation","root words","affixes"],
 "A prefix is added to the beginning of a word and a suffix to the end, changing its meaning or word class.",
 "Words are like building blocks you can add pieces to.",
 ["Find the root word (happy).","Add a prefix to change meaning (unhappy).","Add a suffix to change class (happiness, happily).","Spelling may change (happy → happiness)."],
 "Un- (not), re- (again), dis- (opposite), -ful (full of), -less (without), -tion (act of): 'disagreement' = dis + agree + ment.",
 "Vocabulary building, spelling and understanding new words.",
 ["Helps you work out unknown words","Grows vocabulary quickly","Improves spelling"],
 ["Changing the spelling incorrectly","Assuming every 'un-' word means 'not'","Mixing similar suffixes such as -able and -ible"],
 "Prefix goes before the root; suffix goes after.", EN_W);

eduAdd("synonyms_antonyms","english",[],"Synonyms and antonyms",
 ["synonym","synonyms","antonym","antonyms","opposites","words with similar meaning","homonyms"],
 "Synonyms are words with similar meanings; antonyms are words with opposite meanings.",
 "A thesaurus is a dictionary of synonyms.",
 ["Check the exact meaning and tone: synonyms are rarely identical.","Synonyms: big → large, huge.","Antonyms: hot ↔ cold, brave ↔ cowardly.","Choose the word that fits the context."],
 "'Clever' and 'cunning' both mean intelligent, but cunning suggests trickery.",
 "Better writing, comprehension and vocabulary tests.",
 ["Avoids repeated words","Makes writing precise and rich","Useful for comprehension questions"],
 ["Using a synonym with the wrong tone or shade of meaning","Over-fancy words that confuse","Choosing a word that does not fit the sentence"],
 "Synonym = similar meaning; antonym = opposite meaning.", EN_W);

eduAdd("idioms_proverbs","english",[],"Idioms and proverbs",
 ["idiom","idioms","proverb","proverbs","sayings","figurative expressions","phrasal verbs"],
 "An idiom is an expression whose meaning is different from the literal words. A proverb is a short traditional saying that gives advice or a general truth.",
 "Idioms are word shortcuts that everyone in a language shares.",
 ["Do not translate idioms word for word.","Learn the meaning in context: 'break the ice' = start a conversation.","Proverbs give wisdom: 'A stitch in time saves nine' = fix problems early.","Use idioms sparingly in formal writing."],
 "'It's raining cats and dogs' means it is raining heavily.",
 "Speaking, creative writing and comprehension.",
 ["Make speech and writing lively","Show cultural knowledge","Needed to understand native speakers"],
 ["Taking them literally","Mixing two idioms together","Overusing clichés in essays"],
 "Idiom = a fixed expression with a non-literal meaning.", EN_W);

/* ── Writing and reading skills ── */
eduAdd("essay_writing","english",[],"Essay writing",
 ["essay","essays","essay writing","how to write an essay","essay structure","introduction body conclusion"],
 "An essay is a structured piece of writing that develops one main idea or argument with an introduction, body paragraphs and a conclusion.",
 "An essay is a short journey: you tell the reader where you are going, take them there, and remind them where you arrived.",
 ["Understand the question and plan: list ideas and order them.","Introduction: hook, background and a clear thesis (main point).","Body paragraphs: one idea each, with evidence and explanation.","Conclusion: sum up the argument and end strongly; then proofread."],
 "Question: 'Should schools start later?' Thesis: 'Schools should start later because sleep improves learning, health and safety.' Each reason becomes one body paragraph.",
 "School and university assessments, applications and professional writing.",
 ["Organises thinking clearly","Is the main form of assessment","Develops argument and evidence skills"],
 ["Not answering the question asked","No plan or thesis","Introducing new ideas in the conclusion"],
 "Essay = introduction + body + conclusion.", EN_W);

eduAdd("paragraph_writing","english",[],"Paragraph writing (PEEL)",
 ["paragraph","paragraphs","paragraph writing","peel paragraph","topic sentence","point evidence explain link","peel"],
 "A paragraph is a group of sentences about one idea. The PEEL method: Point, Evidence, Explain, Link.",
 "One paragraph, one idea.",
 ["Point: start with a topic sentence stating the idea.","Evidence: give an example, fact or quotation.","Explain: show how the evidence proves your point.","Link: connect back to the question or to the next paragraph."],
 "Point: Exercise improves concentration. Evidence: Studies show students concentrate better after exercise. Explain: Blood flow to the brain increases. Link: So schools should offer sport before lessons.",
 "Essays, reports, exam answers and emails.",
 ["Keeps writing organised","Ensures every claim has evidence","Makes answers easy to mark and read"],
 ["Paragraphs that cover several ideas","Evidence with no explanation","Very long or very short paragraphs"],
 "PEEL = Point, Evidence, Explain, Link.", EN_W);

eduAdd("essay_types","english",[],"Types of essays",
 ["types of essays","narrative essay","descriptive essay","expository essay","persuasive essay","persuasive writing","kinds of essay","creative writing"],
 "Different essays have different purposes: narrative (tell a story), descriptive (paint a picture), expository (explain) and persuasive or argumentative (convince).",
 "Each type has a different goal, so it needs a different style.",
 ["Narrative: events in order, characters, setting, a climax and an ending.","Descriptive: use the five senses and strong adjectives.","Expository: explain facts clearly and logically.","Persuasive: state a view and support it with reasons and evidence."],
 "A narrative essay about a journey tells what happened; a descriptive essay about the same journey focuses on how it looked, sounded and felt.",
 "School exams, competitions, journalism and creative writing.",
 ["Matches style to purpose","Makes writing more effective","Prepares you for different exam questions"],
 ["Mixing styles (telling a story in an expository essay)","Ignoring the purpose of the task","Overusing adjectives without structure"],
 "Essay type depends on purpose: narrate, describe, explain, persuade.", EN_W);

eduAdd("argumentative_essay","english",[],"Argumentative essay",
 ["argumentative essay","argumentative writing","argument essay","write an argument","counter argument","counterargument","debate essay"],
 "An argumentative essay takes a clear position on an issue and defends it with reasons and evidence, while dealing fairly with the opposing view.",
 "It is a courtroom speech: claim, evidence, then answer the other side.",
 ["State a clear thesis (your position).","Give two or three strong reasons, each in its own paragraph with evidence.","Include a counter-argument and rebut it.","Conclude by restating the thesis and what follows from it."],
 "Thesis: 'Homework should be limited.' Reason: it reduces sleep. Evidence: surveys. Counter-argument: it builds discipline. Rebuttal: discipline can be built with shorter tasks.",
 "School and university assessment, debates, law and opinion writing.",
 ["Builds logical thinking","Teaches you to use evidence","Prepares you for academic work"],
 ["Giving opinions without evidence","Ignoring the other side","Emotional language in place of reasons"],
 "Argumentative essay = position + reasons + evidence + counter-argument.", EN_W);

eduAdd("formal_letter","english",[],"Formal letter",
 ["formal letter","formal letters","official letter","application letter","letter of application","letter to the editor","formal letter format"],
 "A formal letter is written to someone you do not know well, such as a principal, employer or editor, in polite and serious language.",
 "Think of it as speaking politely to an official.",
 ["Write your address and the date at the top.","Write the receiver's name or title and address, then the greeting (Dear Sir/Madam or Dear Mr Okafor).","Give a subject line, then the body: purpose, details and request.","End politely: Yours faithfully (Dear Sir/Madam) or Yours sincerely (named person), then sign."],
 "Opening: 'I am writing to apply for the position of library assistant advertised in your notice dated 3 May.'",
 "Job applications, complaints, requests and school or business matters.",
 ["Gives a professional impression","Makes your request clear","Is often tested in exams"],
 ["Using slang or contractions","Wrong ending (faithfully and sincerely mixed up)","Long, unfocused paragraphs"],
 "Formal letter = polite, structured and to the point.", EN_W);

eduAdd("informal_letter","english",[],"Informal letter and email",
 ["informal letter","informal letters","friendly letter","personal letter","letter to a friend","email writing","informal email","write an email"],
 "An informal letter or email is written to a friend or family member in a friendly, conversational tone.",
 "Write it like you speak to a friend, but keep it clear.",
 ["Write your address and date (letters) or a subject line (emails).","Greeting: Dear Ada, or Hi Ada,","Body: personal news, questions and feelings, in short paragraphs.","Closing: Best wishes, Love, Your friend, then your name."],
 "Opening: 'Hope you are well. I'm writing to tell you about my trip.'",
 "Staying in touch, exams and everyday communication.",
 ["Builds relationships","Allows a relaxed, personal style","Easy to organise"],
 ["Too much slang or text-message spelling","No clear purpose or paragraphs","Forgetting greeting and closing"],
 "Informal letter = friendly tone, clear paragraphs.", EN_W);

eduAdd("report_writing","english",[],"Report writing",
 ["report writing","write a report","report format","school report","formal report","lab report"],
 "A report presents facts and findings about a topic or event in a clear, organised and objective way.",
 "A report is like a news bulletin: facts first, opinions kept for the recommendation.",
 ["Title: say what the report is about.","Introduction: purpose and background.","Findings: facts, in headed sections or bullet points.","Conclusion and recommendations."],
 "Report on a school sports day: title, introduction (date and place), findings (events and results) and recommendations (more time for races).",
 "Schools, offices, science labs and journalism.",
 ["Clear and easy to scan","Supports decisions with facts","Shows organisation skills"],
 ["Mixing opinions and facts","Poor structure or no headings","Using chatty language"],
 "Report = title, introduction, findings, conclusion.", EN_W);

eduAdd("speech_writing","english",[],"Speech writing and public speaking",
 ["speech writing","write a speech","public speaking","oral presentation","giving a speech","debate","debating"],
 "A speech is written to be spoken. It should grab attention, have a clear message and be easy to follow by ear.",
 "A speech is a conversation with a big audience.",
 ["Know your audience and purpose.","Open with a hook and greet the audience.","Make 2–3 clear points with examples; repeat key ideas and use short sentences.","Close with a memorable call to action; practise aloud."],
 "Opening: 'Good morning, fellow students. How many of us finished our reading this week?' Question hooks engage the audience immediately.",
 "School assemblies, debates, interviews, presentations and leadership.",
 ["Builds confidence and influence","Develops clear thinking","Valued in jobs and university"],
 ["Reading from the page without eye contact","Too many ideas","Speaking too fast or using complicated words"],
 "Speech = hook, clear points, strong ending.", EN_W);

eduAdd("summary_writing","english",[],"Summary writing",
 ["summary writing","summarising","summarizing","write a summary","how to summarise","precis","précis"],
 "A summary is a short version of a text that keeps only the main points, in your own words.",
 "Think of it as telling a friend the story in 30 seconds.",
 ["Read the text and underline the main points.","Cut examples, repetition and minor details.","Write the points in your own words and in full sentences.","Check the length limit and the meaning."],
 "A long article on recycling can be summarised as: 'Recycling saves energy and resources, but it needs better collection and public awareness.'",
 "Exams, note-taking, reports and research.",
 ["Saves time","Shows you understood the text","Helps revision"],
 ["Copying sentences from the text","Including opinions or details","Going over or under the word limit"],
 "Summary = main points only, in your own words.", EN_W);

eduAdd("comprehension","english",[],"Reading comprehension",
 ["comprehension","reading comprehension","comprehension passage","understanding a text","inference","infer"],
 "Reading comprehension means understanding and interpreting a text, answering questions about both what is stated and what is implied.",
 "It is like being a detective: some clues are stated, some you work out.",
 ["Read the passage once for the main idea, then read the questions.","Find the evidence in the text for each answer.","Direct questions: copy or paraphrase the facts; inference questions: use clues to work out what is implied.","Answer in full sentences and check with the text."],
 "If the text says 'Tom grabbed his umbrella and a coat,' you can infer that the weather is wet or cold.",
 "Exams, university reading and everyday understanding.",
 ["Improves reading and thinking","Core part of every English exam","Prepares you for research"],
 ["Answering from memory instead of the text","Copying too much text","Missing what the question asks (who, why, how)"],
 "Comprehension = understand the stated and the implied.", EN_W);

eduAdd("thesis_statement","english",[],"Thesis statement",
 ["thesis statement","thesis","main argument","central argument"],
 "A thesis statement is one or two sentences that state the main argument of an essay and guide everything that follows.",
 "It is the compass of your essay.",
 ["Take a clear position, not just a topic.","Make it specific and arguable.","Preview your main reasons.","Place it at the end of the introduction."],
 "Weak: 'This essay is about social media.' Strong: 'Social media harms teenagers' sleep and self-esteem, so schools should teach responsible use.'",
 "Essays, research papers and dissertations.",
 ["Keeps the essay focused","Helps the reader follow your argument","Makes planning easier"],
 ["A topic with no position","Too broad or too vague","A fact nobody could argue with"],
 "Thesis = your main argument in one or two sentences.", EN_W);

eduAdd("academic_writing","english",["history"],"Academic writing, referencing and plagiarism",
 ["academic writing","referencing","citation","citations","bibliography","plagiarism","harvard referencing","apa referencing","research writing","literature review"],
 "Academic writing is formal, evidence-based writing used at university. Referencing shows where your ideas and evidence come from, and plagiarism is using others' work without credit.",
 "Referencing is giving credit, like naming the author of a song you are quoting.",
 ["Use a formal tone and precise vocabulary; avoid slang.","Support claims with sources from books and journals.","Cite in the text (e.g. Author, year) and list the sources in a reference list or bibliography.","Paraphrase in your own words and quote only short passages with quotation marks."],
 "In-text citation (author-date style): 'Sleep improves memory (Walker, 2017).' The full details appear in the reference list.",
 "University essays, research papers, dissertations and reports.",
 ["Makes work credible and checkable","Avoids plagiarism and penalties","Shows you can use research"],
 ["Copying and pasting without credit","Inconsistent referencing style","Relying on weak or unreliable sources"],
 "Academic writing = formal, evidence-based, and always referenced.", EN_W);

eduAdd("literary_analysis","english",[],"Writing a literary analysis",
 ["literary analysis","critical analysis","analyse a poem","analyse a text","how to analyse a poem","text analysis","close reading","analysing a text"],
 "Literary analysis explains how a writer uses language, structure and ideas to create meaning and effect, supported by evidence from the text.",
 "It is like taking a watch apart to see how it works.",
 ["Read closely and note what the text says (theme and content).","Identify techniques: imagery, tone, structure, devices.","Explain the effect on the reader and why the writer chose them.","Write in PEEL paragraphs with short quotations as evidence."],
 "Instead of 'the poet uses a simile', write 'the simile comparing the soldier to a candle suggests how fragile his life is.'",
 "English literature exams and university essays.",
 ["Develops deep reading skills","Earns higher marks than retelling the plot","Builds critical thinking"],
 ["Retelling the story instead of analysing","Naming devices without explaining the effect","Using long quotations"],
 "Analysis = technique + effect + evidence.", EN_W);

eduAdd("note_making","english",[],"Note-making and study skills",
 ["note making","note taking","taking notes","study skills","mind map","study techniques"],
 "Note-making is recording key information in a short, organised form for revision.",
 "Notes are a map, not a copy.",
 ["Listen or read for the main ideas.","Write headings, keywords and short phrases.","Use abbreviations, bullet points or a mind map.","Review within 24 hours and add examples."],
 "A page on the French Revolution might become: Causes → debt, inequality, Enlightenment ideas; Events → 1789, Terror; Result → Napoleon.",
 "Lectures, revision and exams.",
 ["Helps memory","Saves study time","Makes revision efficient"],
 ["Copying everything word for word","Messy notes never reviewed","Leaving out the main idea"],
 "Notes = key points in your own organised words.", EN_W);

/* ══════════════ ENGLISH — part 2: literature, set texts, linguistics ══════════════ */
const EN_L = {advLabel:"Why writers use it", disLabel:"Common mistakes", chipJoiner:": "};

/* ── Figures of speech and devices ── */
eduAdd("figures_of_speech","english",[],"Figures of speech",
 ["figures of speech","figure of speech","figurative language","literary devices","literary device","stylistic devices"],
 "Figures of speech are expressions that use words in a non-literal way to create effects such as vivid images, humour or emphasis.",
 "They paint pictures with words instead of stating facts plainly.",
 ["Comparisons: simile, metaphor, personification.","Exaggeration and contradiction: hyperbole, oxymoron, paradox.","Sound devices: alliteration, assonance, onomatopoeia.","Meaning devices: irony, symbolism, imagery."],
 "'The classroom was a zoo' is a metaphor; 'as busy as a bee' is a simile.",
 "Poetry, stories, speeches, advertising and everyday talk.",
 ["Make writing vivid and memorable","Express emotions powerfully","Add depth and style"],
 ["Naming a device without explaining its effect","Confusing simile and metaphor","Overusing clichés"],
 "Figures of speech = non-literal language for effect.", EN_L);

eduAdd("simile","english",[],"Simile",
 ["simile","similes"],
 "A simile compares two different things using 'like' or 'as'.",
 "Simile = comparison with like or as.",
 ["Name the two things being compared.","Look for 'like' or 'as'.","Work out what they share.","Explain the effect on the reader."],
 "'She was as quiet as a mouse.' The comparison stresses how silent she was.",
 "Poetry, stories, descriptions and speeches.",
 ["Makes descriptions clear and vivid","Helps readers picture ideas","Is easy to understand"],
 ["Calling a metaphor a simile (no 'like' or 'as')","Clichés such as 'as cold as ice'","Explaining only that it is a comparison, not its effect"],
 "Simile = comparison using like or as.", EN_L);

eduAdd("metaphor","english",[],"Metaphor",
 ["metaphor","metaphors","extended metaphor"],
 "A metaphor says one thing IS another to create a vivid image, without using 'like' or 'as'.",
 "Metaphor says it is, simile says it is like.",
 ["Identify the two things being compared.","Notice that one is said to BE the other.","Work out the shared qualities.","Explain the effect and the idea it suggests."],
 "'Time is a thief' suggests time quietly steals moments from us.",
 "Poetry, speeches, songs and everyday language.",
 ["Creates strong and powerful images","Expresses ideas in a memorable way","Adds depth and layers of meaning"],
 ["Taking a metaphor literally","Confusing it with simile","Mixed metaphors that clash"],
 "Metaphor = saying one thing is another.", EN_L);

eduAdd("personification_hyperbole","english",[],"Personification and hyperbole",
 ["personification","hyperbole","exaggeration","giving human qualities","overstatement"],
 "Personification gives human qualities to non-human things. Hyperbole is deliberate exaggeration for emphasis.",
 "Personification makes things act like people; hyperbole turns the volume up.",
 ["Personification: 'The wind whispered through the trees.'","Hyperbole: 'I've told you a million times.'","Neither is meant to be literally true.","Explain the effect: personification adds life; hyperbole shows strong feeling."],
 "'The sun smiled on the village' (personification) and 'I'm so hungry I could eat a horse' (hyperbole).",
 "Poetry, advertising, stories and speech.",
 ["Adds life and emotion","Makes points memorable","Captures attention"],
 ["Mixing up the two","Overusing exaggeration","Saying 'it is used for effect' without explaining"],
 "Personification = human traits for things; hyperbole = exaggeration.", EN_L);

eduAdd("sound_devices","english",[],"Alliteration, assonance and onomatopoeia",
 ["alliteration","assonance","onomatopoeia","consonance","sound devices","sound of words"],
 "Sound devices use the sounds of words for effect: alliteration repeats starting consonants, assonance repeats vowel sounds, and onomatopoeia words imitate sounds.",
 "They make writing sound musical.",
 ["Alliteration: 'Peter picked a peck of pickled peppers.'","Assonance: 'The rain in Spain stays mainly on the plain.'","Onomatopoeia: buzz, crash, sizzle.","Explain the effect: rhythm, mood or a sense of sound."],
 "'The snake slid silently' repeats the s-sound to suggest a hiss.",
 "Poetry, advertising slogans, songs and stories.",
 ["Add rhythm and music","Make phrases memorable","Create atmosphere"],
 ["Calling any repeated word alliteration (it must be the sound)","Not linking the sound to the effect","Forgetting onomatopoeia is about imitating a sound"],
 "Sound devices: alliteration, assonance, onomatopoeia.", EN_L);

eduAdd("irony","english",[],"Irony",
 ["irony","ironic","verbal irony","dramatic irony","situational irony","sarcasm"],
 "Irony is a contrast between what is said or expected and what actually happens or is meant.",
 "Irony is when the opposite happens, or the speaker says the opposite.",
 ["Verbal irony: saying the opposite of what you mean.","Situational irony: the outcome is the opposite of what is expected.","Dramatic irony: the audience knows something the characters do not.","Explain the effect: humour, tension or criticism."],
 "A fire station burning down is situational irony. In Romeo and Juliet the audience knows Juliet is only drugged, but Romeo does not: dramatic irony.",
 "Plays, novels, satire, humour and everyday speech.",
 ["Creates humour or tension","Lets writers criticise subtly","Engages the reader's intelligence"],
 ["Confusing irony with coincidence or bad luck","Not naming the type","Not explaining the effect"],
 "Irony = a gap between expectation and reality.", EN_L);

eduAdd("symbolism_imagery","english",[],"Symbolism and imagery",
 ["symbolism","symbol","symbols","imagery","visual imagery","sensory imagery","motif","motifs"],
 "A symbol is an object, person or place that stands for a bigger idea. Imagery is language that appeals to the senses to create pictures in the mind.",
 "A symbol is a sign with a hidden meaning; imagery makes you see, hear, smell, taste or feel.",
 ["Symbol: a dove stands for peace; a storm may stand for conflict.","Imagery: sight, sound, smell, taste and touch descriptions.","A motif is a repeated symbol or idea.","Explain what it suggests and how it supports the theme."],
 "A cracked mirror in a story might symbolise a broken identity.",
 "Poetry, novels, films and advertising.",
 ["Add depth and hidden meaning","Make scenes vivid","Support themes without stating them"],
 ["Calling everything a symbol","Not explaining what the symbol means","Describing imagery without its effect"],
 "Symbol = stands for an idea; imagery = language for the senses.", EN_L);

eduAdd("tone_mood","english",[],"Tone and mood",
 ["tone","mood","tone and mood","atmosphere","writers tone","mood of a poem"],
 "Tone is the writer's or speaker's attitude toward the subject. Mood is the feeling the text creates in the reader.",
 "Tone is how the writer sounds; mood is how you feel.",
 ["Look at word choice (diction): bright or gloomy words.","Look at sentence length and punctuation.","Name the tone (sarcastic, serious, hopeful) and the mood (tense, calm).","Support with evidence from the text."],
 "A story full of short sentences and words like 'dark', 'creaked' and 'whispered' creates a tense, eerie mood.",
 "Comprehension and literature exams, speeches and journalism.",
 ["Shows the writer's attitude","Guides the reader's feelings","Is a key skill for analysis"],
 ["Confusing tone and mood","Using vague words like 'happy' or 'sad' only","Naming the tone without evidence"],
 "Tone = writer's attitude; mood = reader's feeling.", EN_L);

eduAdd("point_of_view","english",[],"Point of view and narrator",
 ["point of view","narrator","narrators","first person","third person","omniscient narrator","narrative voice","unreliable narrator"],
 "Point of view is the position from which a story is told: the narrator.",
 "It is the camera angle of the story.",
 ["First person: the narrator is a character (I, we).","Second person: addresses the reader (you).","Third person limited: tells one character's thoughts; third person omniscient: knows everything.","An unreliable narrator may not tell the truth."],
 "'I walked into the room and froze.' is first person; 'She walked into the room and froze.' is third person.",
 "Reading, creative writing and literary analysis.",
 ["Controls what the reader knows","Shapes sympathy for characters","Creates suspense or intimacy"],
 ["Confusing the author with the narrator","Mixing viewpoints by accident","Not explaining the effect"],
 "Point of view = who tells the story.", EN_L);

/* ── Elements of fiction and genres ── */
eduAdd("plot_structure","english",[],"Plot and story structure",
 ["plot of a story","story plot","plot structure","narrative structure","freytags pyramid","exposition climax resolution","elements of a story","story elements"],
 "The plot is the sequence of events in a story. Most plots follow a structure: exposition, rising action, climax, falling action and resolution.",
 "A plot is like a hill: it climbs to the climax and comes down.",
 ["Exposition: introduces characters and setting.","Rising action: conflict and problems build up.","Climax: the turning point or most tense moment.","Falling action and resolution: consequences and the ending."],
 "In Cinderella: the exposition shows her unhappy home, the climax is the shoe fitting, and the resolution is her happy marriage.",
 "Story writing, exams and analysing novels, plays and films.",
 ["Helps you write well-organised stories","Helps you summarise and analyse texts","Shows how tension is built"],
 ["Confusing plot with theme","Retelling the whole story instead of identifying parts","Skipping the exposition or ending when writing"],
 "Plot = exposition, rising action, climax, falling action, resolution.",
 Object.assign({not:["graph","graphs","points","coordinates","curve","line","equation"]}, EN_L));

eduAdd("theme","english",[],"Theme",
 ["theme","themes","central theme","theme of a story","theme in literature","main message","moral of the story"],
 "A theme is the central idea or message about life that a text explores, such as love, power, identity or justice.",
 "The plot is what happens; the theme is what it means.",
 ["Identify the main events and conflicts.","Ask what ideas keep coming back (a motif).","State the theme as a full sentence, e.g. 'Ambition can destroy a person.'","Support it with evidence from the text."],
 "In Macbeth, repeated images of blood and sleeplessness support the theme that guilt destroys peace of mind.",
 "Literature exams and discussions.",
 ["Shows deeper understanding","Links text to real life","Earns higher marks in analysis"],
 ["Writing one word ('love') instead of a statement","Confusing theme with plot or topic","No evidence"],
 "Theme = the central message of a text.", EN_L);

eduAdd("characterisation","english",[],"Characterisation",
 ["character","characters","characterisation","characterization","character analysis","protagonist","antagonist","round and flat characters","main character"],
 "Characterisation is how writers create and develop characters, through what they say, do, think and how others see them.",
 "Writers show characters the way real people reveal themselves: by actions and words.",
 ["Direct: the narrator tells us ('He was greedy').","Indirect: shown through speech, actions, thoughts and reactions.","Protagonist is the main character; antagonist opposes them.","Round characters change and have depth; flat characters stay the same."],
 "A character who shares his last food with a stranger is shown to be generous, without the writer saying so.",
 "Studying novels, plays and films, and writing stories.",
 ["Makes characters believable","Drives the plot and themes","Is a main focus in literature exams"],
 ["Describing appearance only","No evidence from the text","Confusing a character's feelings with the writer's views"],
 "Characterisation = how a character is built through words and actions.", EN_L);

eduAdd("setting_conflict","english",[],"Setting and conflict",
 ["setting of a story","story setting","setting","conflict in literature","types of conflict","internal conflict","external conflict","man vs man"],
 "Setting is the time and place of a story. Conflict is the struggle between opposing forces that drives the plot.",
 "Setting is the stage; conflict is the problem the characters face on it.",
 ["Setting: where and when, plus the atmosphere.","Internal conflict: a struggle inside a character.","External conflict: against another person, society, nature or fate.","Conflict builds tension and leads to the climax."],
 "A shipwreck survivor battling the sea shows external conflict (character vs nature) and doubts about survival show internal conflict.",
 "Reading, creative writing and exams.",
 ["Setting creates mood and context","Conflict creates interest and suspense","Both shape the plot and themes"],
 ["Describing the place without its effect","Missing internal conflict","Treating setting as irrelevant"],
 "Setting = time and place; conflict = the central struggle.", EN_L);

eduAdd("literary_genres","english",[],"Literary genres: prose, poetry and drama",
 ["literary genres","genres of literature","prose","poetry","drama","novel","short story","types of literature","fiction and non fiction"],
 "The three main genres of literature are prose (novels and short stories), poetry (verse arranged in lines) and drama (plays written to be performed).",
 "Each genre is a different way to tell a story or share an idea.",
 ["Prose: ordinary written language in sentences and paragraphs.","Poetry: concentrated language with rhythm, imagery and often rhyme.","Drama: dialogue and stage directions for performance.","Fiction is invented; non-fiction deals with facts."],
 "'Things Fall Apart' is a novel (prose), 'Macbeth' is a play (drama) and a sonnet is poetry.",
 "Literature courses and understanding how texts work.",
 ["Helps you choose how to read each text","Basis for analysis","Shows the range of writing"],
 ["Calling every text a poem or story","Ignoring genre conventions","Confusing a novel with a short story"],
 "Genres: prose, poetry, drama.", EN_L);

eduAdd("tragedy_comedy","english",[],"Tragedy and comedy",
 ["tragedy","comedy","tragic hero","tragic flaw","hamartia","tragicomedy","satire"],
 "A tragedy is a serious drama in which a main character suffers a downfall, often because of a flaw. A comedy is a drama that ends happily, usually with humour.",
 "Tragedy ends in loss; comedy ends in restored order and happiness.",
 ["Tragic hero: a noble character with a flaw (hamartia).","Downfall: the hero's choices lead to disaster.","Catharsis: the audience feels pity and fear, and is relieved.","Comedy: misunderstandings, wit and a happy ending; satire mocks faults in society."],
 "Macbeth is a tragedy (ambition causes his downfall). A Midsummer Night's Dream is a comedy.",
 "Drama and literature exams.",
 ["Helps analyse plays","Shows how plots are shaped","Explains audience response"],
 ["Calling any sad story a tragedy","Not naming the flaw","Ignoring the audience's response"],
 "Tragedy = downfall; comedy = happy ending.", EN_L);

eduAdd("poetry_terms","english",[],"Poetry terms: stanza, rhyme and rhythm",
 ["poetry terms","stanza","stanzas","rhyme scheme","rhyme","rhythm","metre","meter","verse","couplet","free verse","enjambment","poem structure","how to read a poem","poem"],
 "Poetry uses structure and sound to express ideas. Key terms include stanza, rhyme scheme, rhythm (metre), couplet and free verse.",
 "A poem is like a song without music: structure and sound do the work.",
 ["Stanza: a group of lines (like a paragraph); couplet: two lines.","Rhyme scheme: pattern of end rhymes, written as ABAB.","Rhythm or metre: the pattern of stressed and unstressed syllables.","Free verse has no regular rhyme or metre; enjambment runs a line into the next."],
 "A rhyme scheme of ABAB means lines 1 and 3 rhyme and lines 2 and 4 rhyme.",
 "Poetry exams and creative writing.",
 ["Gives the language to analyse poems","Shows how form supports meaning","Improves your own writing"],
 ["Naming features without effects","Assuming all poems rhyme","Reading poems like prose and missing line breaks"],
 "Stanza = group of lines; rhyme scheme = pattern of rhymes.", EN_L);

eduAdd("sonnet_ballad","english",[],"Sonnet, ballad, haiku and other poem forms",
 ["sonnet","sonnets","shakespearean sonnet","petrarchan sonnet","ballad","haiku","elegy","ode","epic","poem forms","types of poems"],
 "Poems come in set forms. A sonnet has 14 lines; a ballad tells a story in short stanzas; a haiku is a short Japanese-style poem about nature.",
 "A form is like a mould that shapes what the poem says.",
 ["Shakespearean sonnet: 14 lines, rhyme ABAB CDCD EFEF GG, ending in a couplet.","Petrarchan sonnet: an octave (8 lines) then a sestet (6 lines).","Ballad: a story-poem, usually in quatrains.","Haiku: three lines of 5, 7 and 5 syllables; elegy mourns a death; ode praises someone or something."],
 "Shakespeare's sonnets, such as those on love and time, follow the ABAB CDCD EFEF GG pattern, and the final couplet gives the conclusion.",
 "Poetry courses and creative writing.",
 ["Understanding form helps you analyse meaning","Shows the history of poetry","Lets you write in set forms"],
 ["Mixing up the sonnet types","Counting syllables wrongly in a haiku","Ignoring how the form supports the message"],
 "Sonnet = 14 lines; ballad = story poem; haiku = 5-7-5.", EN_L);

eduAdd("drama_terms","english",[],"Drama terms: soliloquy, aside and stage directions",
 ["soliloquy","aside","stage directions","dramatic terms","dialogue","monologue","act and scene","protagonist in a play","how to read a play"],
 "Drama is written to be performed. Key terms include dialogue, monologue, soliloquy, aside, and stage directions.",
 "A play lives on the stage, so every word is meant to be heard.",
 ["Dialogue: conversation between characters.","Monologue: a long speech to others; soliloquy: a character speaks thoughts aloud, alone.","Aside: a short remark to the audience others do not hear.","Stage directions describe actions, movements and setting; plays are divided into acts and scenes."],
 "In Hamlet's soliloquy beginning 'To be, or not to be', he thinks aloud about life and death while alone on stage.",
 "Drama study, performing and exams.",
 ["Helps you analyse performance as well as text","Shows what characters really think","Needed for play-based exam questions"],
 ["Confusing soliloquy and monologue","Ignoring stage directions","Treating a play like a novel"],
 "Drama terms: dialogue, monologue, soliloquy, aside, stage directions.", EN_L);

/* ── Set texts (plot summaries and themes only) ── */
eduAdd("romeo_and_juliet","english",[],"Romeo and Juliet (Shakespeare)",
 ["romeo and juliet","romeo juliet","romeo & juliet","shakespeare romeo"],
 "Romeo and Juliet is a tragedy by William Shakespeare, written in the 1590s, about two young lovers from feuding families in Verona.",
 "Love born in the middle of a family war.",
 ["The Montagues and Capulets are enemies; Romeo and Juliet fall in love and marry in secret with Friar Laurence's help.","Romeo kills Juliet's cousin Tybalt after Tybalt kills Romeo's friend Mercutio, and Romeo is banished.","Juliet takes a potion to appear dead and avoid a forced marriage, but Romeo does not receive the message.","Romeo, believing she is dead, takes poison; Juliet wakes and kills herself; the families end their feud."],
 "Key themes: love versus hate, fate, haste and conflict between generations. Dramatic irony: the audience knows Juliet is only sleeping.",
 "Literature exams and school study.",
 ["A classic study of love, fate and conflict","Rich in imagery and dramatic irony","Often used to teach analysis of language and structure"],
 ["Mixing up Romeo and Juliet's family names","Retelling the plot instead of analysing it","Ignoring the language and form"],
 "Romeo and Juliet: a tragedy of young love and a feud.",
 Object.assign({}, EN_L, {advLabel:"Why it is studied", disLabel:"Common mistakes in exams"}));

eduAdd("macbeth","english",[],"Macbeth (Shakespeare)",
 ["macbeth","lady macbeth","shakespeare macbeth"],
 "Macbeth is a tragedy by William Shakespeare about a Scottish general whose ambition leads him to murder the king and take the throne.",
 "A man pushed by ambition and then destroyed by guilt.",
 ["Three witches tell Macbeth he will become king.","Encouraged by Lady Macbeth, he murders King Duncan and takes the crown.","He kills more people to stay in power, and is haunted by guilt and Banquo's ghost; Lady Macbeth goes mad.","Macduff kills Macbeth and Malcolm becomes king."],
 "Key themes: ambition, guilt, fate versus free will, and the supernatural. Imagery of blood and sleeplessness reflects guilt.",
 "Literature exams and school study.",
 ["Shows how unchecked ambition destroys","Strong study of character and imagery","Often used to teach tragedy"],
 ["Blaming only the witches or only Lady Macbeth","Retelling instead of analysing","Not linking events to themes"],
 "Macbeth: ambition leads to murder, guilt and downfall.",
 Object.assign({}, EN_L, {advLabel:"Why it is studied", disLabel:"Common mistakes in exams"}));

eduAdd("hamlet","english",[],"Hamlet (Shakespeare)",
 ["hamlet","prince hamlet","shakespeare hamlet"],
 "Hamlet is a tragedy by William Shakespeare about a Danish prince who seeks revenge for his father's murder.",
 "A prince who thinks too long before he acts.",
 ["The ghost of Hamlet's father says his brother Claudius murdered him.","Hamlet pretends to be mad and tests Claudius with a play that mirrors the murder.","He kills Polonius by mistake; Ophelia, driven mad by grief, dies.","In a final duel, Hamlet, Claudius, Gertrude and Laertes all die."],
 "Key themes: revenge, madness, delay and indecision, and corruption. His soliloquies show his inner conflict.",
 "Literature exams and university study.",
 ["One of the most studied plays in English","Deep exploration of thought, doubt and action","Rich in soliloquies"],
 ["Calling Hamlet simply mad","Ignoring the political side of the play","Retelling instead of analysing"],
 "Hamlet: a prince's revenge, doubt and tragedy.",
 Object.assign({}, EN_L, {advLabel:"Why it is studied", disLabel:"Common mistakes in exams"}));

eduAdd("things_fall_apart","english",["history"],"Things Fall Apart (Chinua Achebe)",
 ["things fall apart","okonkwo","chinua achebe","achebe","umuofia"],
 "Things Fall Apart (1958) by Chinua Achebe is a novel about Okonkwo, a proud Igbo leader in Umuofia, and the arrival of European colonial rule and missionaries in Nigeria.",
 "A strong man and a strong culture facing change they cannot stop.",
 ["Okonkwo rises from poverty, driven by fear of being weak like his father, Unoka.","He accidentally kills a clansman and is exiled for seven years.","While he is away, missionaries and the colonial government take hold of the region.","He returns, tries to resist, kills a court messenger and then takes his own life."],
 "Key themes: tradition versus change, masculinity and pride, colonialism and the clash of cultures, fate. Achebe presents Igbo society with its strengths and flaws.",
 "Literature, history and African studies.",
 ["Gives an African view of colonialism","Rich in culture, proverbs and storytelling","A major postcolonial text"],
 ["Seeing Igbo society as only primitive or only perfect","Retelling instead of analysing the themes","Forgetting the narrator's balanced view"],
 "Things Fall Apart: Okonkwo's fall and the impact of colonialism on Igbo society.",
 Object.assign({}, EN_L, {advLabel:"Why it is studied", disLabel:"Common mistakes in exams"}));

eduAdd("animal_farm","english",["history"],"Animal Farm (George Orwell)",
 ["animal farm","george orwell","orwell","napoleon and snowball"],
 "Animal Farm (1945) by George Orwell is an allegory in which farm animals overthrow their owner and create a society that slowly becomes a dictatorship.",
 "A story about animals that is really about power and politics.",
 ["The animals, inspired by Old Major, drive out Farmer Jones and make rules for equality.","The pigs, led by Napoleon, take control and drive out Snowball.","Napoleon changes the rules, uses fear and propaganda (Squealer) and the other animals suffer.","In the end the pigs look and act like the humans they replaced."],
 "Key themes: abuse of power, corruption, propaganda and betrayal of revolution. It is an allegory of the Russian Revolution and Stalin's rule.",
 "Literature and politics or history courses.",
 ["Clear introduction to allegory and satire","Shows how language is used to control","Short and accessible"],
 ["Treating it as only a children's story","Not linking characters to their real-life parallels","Retelling instead of analysing"],
 "Animal Farm: an allegory of revolution corrupted by power.",
 Object.assign({}, EN_L, {advLabel:"Why it is studied", disLabel:"Common mistakes in exams"}));

/* ── University level: criticism and linguistics ── */
eduAdd("literary_movements","english",["history"],"Literary movements and criticism",
 ["literary movements","literary theory","literary criticism","romanticism","realism","modernism","postmodernism","victorian literature","critical theory","feminist criticism","marxist criticism"],
 "Literary movements are periods or styles with shared ideas, such as Romanticism, Realism and Modernism. Literary theory gives ways to interpret texts, such as feminist, Marxist and psychoanalytic criticism.",
 "Movements are like fashion periods; theories are different lenses for reading.",
 ["Romanticism (late 1700s–1800s): emotion, nature and imagination.","Realism and the Victorian novel: everyday life and social issues.","Modernism (early 1900s): experiment, fragmentation and the inner mind; postmodernism questions truth and form.","Critical lenses: feminist (gender), Marxist (class and power), postcolonial (empire), psychoanalytic (the unconscious)."],
 "Reading Animal Farm through a Marxist lens focuses on class and power; a feminist lens on a novel looks at how women are represented.",
 "University literature courses and essays.",
 ["Places texts in their historical context","Gives frameworks for analysis","Strengthens academic essays"],
 ["Forcing a theory onto a text without evidence","Treating movements as rigid boxes","Using jargon without explaining it"],
 "Movements = periods of style; theories = lenses for reading.", EN_W);

eduAdd("postcolonial_literature","english",["history"],"Postcolonial literature",
 ["postcolonial literature","postcolonial","post colonial","colonial literature","african literature","commonwealth literature","decolonisation in literature"],
 "Postcolonial literature is writing from or about societies that experienced colonial rule, exploring identity, power, language and the effects of empire.",
 "It gives a voice to people whose stories were once told only by colonisers.",
 ["Authors from formerly colonised nations write back to the colonial narrative.","Common themes: identity, culture clash, language, resistance and independence.","Techniques: mixing local languages and English, oral storytelling and proverbs.","Key writers include Chinua Achebe, Wole Soyinka, Chimamanda Ngozi Adichie and Ngũgĩ wa Thiong'o."],
 "Achebe's Things Fall Apart answers earlier colonial novels by presenting Igbo society from the inside.",
 "University literature, history and cultural studies.",
 ["Offers neglected perspectives","Helps understand modern identity and politics","Broadens the literary canon"],
 ["Treating all postcolonial writing as the same","Ignoring the local cultural context","Reducing texts to politics only"],
 "Postcolonial literature = writing about identity and power after colonial rule.", EN_W);

eduAdd("linguistics","english",[],"Linguistics: how language works",
 ["linguistics","study of language","branches of linguistics","english language studies","language study"],
 "Linguistics is the scientific study of language: its sounds, word structure, grammar, meaning and use.",
 "It treats language like a system to be investigated, not just rules to memorise.",
 ["Phonetics and phonology: speech sounds and sound patterns.","Morphology: structure of words.","Syntax: structure of sentences; semantics: meaning; pragmatics: meaning in context.","Sociolinguistics: language and society; also psycholinguistics and historical linguistics."],
 "'Can you pass the salt?' is syntactically a question but pragmatically a polite request.",
 "University English, teaching, translation, speech therapy and technology (AI language tools).",
 ["Explains how and why language varies and changes","Supports teaching and translation","Underlies language technology"],
 ["Mixing descriptive with prescriptive views","Confusing the branches","Treating one dialect as superior"],
 "Linguistics = the scientific study of language.", EN_W);

eduAdd("phonetics_phonology","english",[],"Phonetics and phonology",
 ["phonetics","phonology","phoneme","phonemes","ipa","international phonetic alphabet","speech sounds","consonants and vowels","syllable","syllables","stress and intonation"],
 "Phonetics studies the physical production of speech sounds. Phonology studies how sounds are organised into patterns in a language.",
 "Phonetics is the sound itself; phonology is how a language uses sounds to make meaning.",
 ["Phonemes are the smallest sound units that change meaning (/p/ in pat versus /b/ in bat).","Consonants are described by place and manner of articulation and voicing; vowels by tongue and lip position.","The International Phonetic Alphabet (IPA) gives one symbol per sound.","Stress, rhythm and intonation shape meaning and emotion."],
 "The words 'bat' and 'pat' differ in only one phoneme, which shows /b/ and /p/ are separate phonemes in English.",
 "Pronunciation teaching, speech therapy, dictionaries and speech technology.",
 ["Explains accents and pronunciation","Helps teaching and therapy","Basis of speech recognition"],
 ["Confusing spelling with sound","Mixing up phonetics and phonology","Using slashes and brackets incorrectly in transcription"],
 "Phonetics = speech sounds; phonology = sound patterns.", EN_W);

eduAdd("morphology_syntax","english",[],"Morphology and syntax",
 ["morphology","morpheme","morphemes","syntax","syntax trees","syntactic structure","word structure and sentence structure","inflection","derivation"],
 "Morphology studies how words are built from morphemes (the smallest meaningful units). Syntax studies how words combine into phrases and sentences.",
 "Morphology is how words are built; syntax is how sentences are built from words.",
 ["Morphemes: free (stand alone: cat) and bound (-s, un-).","Inflection changes form without changing word class (walk, walked); derivation creates new words (happy, happiness).","Syntax: words form phrases (noun phrase, verb phrase) which form clauses and sentences.","Tree diagrams show the hierarchy of a sentence."],
 "'Unhappiness' has three morphemes: un- + happy + -ness.",
 "University English language courses, teaching and computational linguistics.",
 ["Explains how new words and sentences are made","Underpins grammar teaching","Basis for language technology"],
 ["Confusing morphemes with syllables","Mixing inflection and derivation","Drawing trees without the right labels"],
 "Morphology = word structure; syntax = sentence structure.", EN_W);

eduAdd("semantics_pragmatics","english",[],"Semantics and pragmatics",
 ["semantics","pragmatics","meaning in language","implicature","speech acts","denotation and connotation","connotation","denotation","ambiguity","context and meaning"],
 "Semantics studies the meaning of words and sentences. Pragmatics studies how context affects meaning in real communication.",
 "Semantics is what words mean; pragmatics is what people mean when they use them.",
 ["Denotation is the literal meaning; connotation is the feelings attached to a word.","Ambiguity: one expression with more than one meaning.","Speech acts: we do things with words (promise, request, apologise).","Implicature: meaning that is suggested, not said."],
 "'It's cold in here' can be a request to close the window; that implied meaning is pragmatic.",
 "Communication, translation, advertising, law and AI language systems.",
 ["Explains misunderstandings","Helps with persuasion and politeness","Basis for natural language processing"],
 ["Treating meaning as fixed and context-free","Confusing connotation and denotation","Ignoring the speaker's intention"],
 "Semantics = meaning of words; pragmatics = meaning in context.", EN_W);

eduAdd("sociolinguistics","english",["history"],"Sociolinguistics: dialects, accents and language change",
 ["sociolinguistics","dialect","dialects","accent","accents","language change","language variation","register","pidgin","creole","bilingualism","code switching","english varieties","world englishes"],
 "Sociolinguistics studies how language varies and changes with society: region, class, age, gender, context and culture.",
 "No two groups speak exactly alike, and language shows who we are.",
 ["Accent is pronunciation; dialect includes vocabulary and grammar as well.","Register is the level of formality chosen for the situation.","Code-switching is moving between languages or styles; pidgins and creoles arise from language contact.","World Englishes recognise that English varies legitimately across countries such as Nigeria, India and Jamaica."],
 "A student may speak formal English in class and a local variety with friends: this is register and code-switching.",
 "Education, language policy, media, translation and research.",
 ["Shows that variation is normal, not wrong","Helps with respectful teaching and policy","Explains how languages change"],
 ["Treating one dialect as superior","Confusing accent and dialect","Ignoring the social context"],
 "Sociolinguistics = language in society.", EN_W);

/* ══ PHYSICS AND CHEMISTRY: extra topics used by the problem solver ══ */
eduAdd("density_pressure","physics",["engineering"],"Density and pressure",
 ["density and pressure","density","pressure","floating and sinking","pascal"],
 "Density is how much mass is packed into a volume (density = mass ÷ volume). Pressure is the force pressing on each unit of area (pressure = force ÷ area).",
 "A brick and a sponge can be the same size, but the brick is denser. A sharp knife presses harder than a blunt one because the same force acts on a smaller area.",
 ["Density ρ = m ÷ V, measured in kg/m³ or g/cm³.","Pressure p = F ÷ A, measured in pascals (N/m²).","An object floats if its density is less than the liquid's density.","Pressure in a liquid increases with depth."],
 "A 100 g metal block with volume 20 cm³ has density 100 ÷ 20 = 5 g/cm³. A 100 N force on 2 m² gives a pressure of 50 N/m².",
 "Ships and submarines, tyres, dams, hydraulic machines and weather.",
 ["Explain why things float or sink","Help design safe structures and machines","Simple formulas that apply widely"],
 ["Unit mistakes (g and kg, cm² and m²)","Mixing up mass and weight","Forgetting that pressure depends on area"],
 "Density = mass ÷ volume; pressure = force ÷ area.");

eduAdd("moles","chemistry",["biochemistry"],"Moles and molar mass",
 ["moles and molar mass","mole","moles","molar mass","relative formula mass","relative molecular mass","avogadro","avogadros number","mole concept","amount of substance"],
 "A mole is the amount of substance containing 6.02 × 10²³ particles. The molar mass is the mass of one mole in grams (g/mol), found by adding the atomic masses in the formula.",
 "A mole is a chemist's 'dozen': a fixed number of particles, so we can count atoms by weighing them.",
 ["Find the molar mass M by adding the atomic masses (H₂O: 2 × 1 + 16 = 18 g/mol).","moles n = mass ÷ molar mass.","mass = n × M.","One mole of any substance contains 6.02 × 10²³ particles."],
 "36 g of water is 36 ÷ 18 = 2 moles of water.",
 "Chemical calculations, medicine doses, lab preparation and industry.",
 ["Lets you link mass to the number of particles","Needed for balanced-equation calculations","Used in every area of chemistry"],
 ["Using the wrong formula for the molar mass","Forgetting subscripts when counting atoms","Mixing mass in g and kg"],
 "n = mass ÷ molar mass.", {not:["animal","skin","spot","spots"]});

eduAdd("concentration","chemistry",["biochemistry"],"Concentration and dilution",
 ["concentration and dilution","concentration","molarity","molar concentration","dilution","dilute","diluting a solution","c1v1"],
 "Concentration tells how much solute is dissolved in a given volume of solution, usually in mol/L (molarity). Diluting adds solvent, lowering the concentration without changing the amount of solute.",
 "Adding water to strong squash makes it weaker, but the amount of squash concentrate stays the same.",
 ["Concentration = moles ÷ volume in litres.","Convert mL to L by dividing by 1000.","For dilution: C₁V₁ = C₂V₂ (amount of solute stays constant).","Rearrange to find the new concentration or the volume to add."],
 "0.5 mol dissolved in 250 mL (0.25 L) gives 0.5 ÷ 0.25 = 2 mol/L. Diluting 50 mL of 2 M to 200 mL gives (2 × 50) ÷ 200 = 0.5 M.",
 "Lab solutions, medicine, cleaning products and food and drink.",
 ["Gives exact control of solution strength","Needed for titrations and reactions","Easy formulas"],
 ["Forgetting to convert mL to L","Using the wrong volume in dilution","Mixing up concentration and amount"],
 "c = n ÷ V; C₁V₁ = C₂V₂.");

/* ══ SECONDARY MATHS: quadratics in depth and related algebra ══ */
eduAdd("completing_square","math",[],"Completing the square",
 ["completing the square","complete the square","completing square","completed square form","vertex form","completing the square method"],
 "Completing the square rewrites a quadratic so that part of it is a perfect square, such as (x + 3)². It is used to solve quadratic equations, to find the turning point of a parabola, and to prove the quadratic formula.",
 "You are adding exactly the missing piece that turns x² + 6x into a square: x² + 6x + 9 = (x + 3)².",
 ["Make the x² coefficient 1 (divide through by a if needed).","Move the constant to the right-hand side.","Add (half the x coefficient)² to both sides.","Factorise the left side as a square, take the square root of both sides (±), then solve for x."],
 "Solve x² + 6x + 5 = 0. Move 5: x² + 6x = -5. Half of 6 is 3, and 3² = 9, so x² + 6x + 9 = 4. Then (x + 3)² = 4, so x + 3 = ±2 and x = -1 or x = -5.",
 "Solving quadratics that do not factorise, finding the maximum or minimum of a quadratic, graphs and physics.",
 ["Works for every quadratic, even when factorising fails","Shows the turning point directly: a(x + h)² + k has its turning point at (-h, k)","Is the method behind the quadratic formula"],
 ["Forgetting to add the same number to BOTH sides","Dividing only some terms by a","Forgetting the ± when taking the square root"],
 "Completing the square: add (b/2)² to both sides to make a perfect square.");

eduAdd("quadratic_formula","math",[],"Quadratic formula and discriminant",
 ["quadratic formula","discriminant","nature of roots","nature of the roots","derive the quadratic formula","derivation of the quadratic formula","b squared minus 4ac"],
 "The quadratic formula x = (−b ± √(b² − 4ac)) ÷ 2a solves any equation ax² + bx + c = 0. The expression b² − 4ac is the discriminant, and it tells you the nature of the roots.",
 "The formula is a ready-made recipe: put in a, b and c and it hands you the answers.",
 ["Write the equation as ax² + bx + c = 0 and identify a, b and c.","Work out the discriminant D = b² − 4ac.","If D > 0 there are two different real roots, if D = 0 two equal roots, and if D < 0 no real roots.","Substitute into x = (−b ± √D) ÷ 2a and simplify."],
 "2x² + 3x − 5 = 0: a = 2, b = 3, c = −5. D = 9 + 40 = 49, so x = (−3 ± 7) ÷ 4, which gives x = 1 or x = −5/2.",
 "Solving any quadratic, projectile problems, area and design problems.",
 ["Always works, whatever the numbers","The discriminant shows how many real roots there are before solving","Proved from completing the square"],
 ["Sign errors with −b and with negative c","Forgetting that the whole of 2a is the denominator","Mixing up b² − 4ac with (b − 4ac)²"],
 "x = (−b ± √(b² − 4ac)) ÷ 2a; D = b² − 4ac.");

eduAdd("roots_sum_product","math",[],"Sum and product of roots",
 ["sum and product of roots","sum of roots","product of roots","roots of a quadratic","forming a quadratic equation","form a quadratic equation","formation of quadratic equations"],
 "For a quadratic ax² + bx + c = 0 with roots α and β, the sum of the roots is −b/a and the product is c/a. Reversing this lets you build a quadratic from its roots.",
 "The roots and the coefficients are linked, so you can find one from the other without solving.",
 ["For ax² + bx + c = 0: α + β = −b/a and αβ = c/a.","To form an equation from the roots, find their sum and product.","Write x² − (sum)x + (product) = 0.","Multiply through to clear any fractions."],
 "Roots 2 and 3: sum = 5, product = 6, so the equation is x² − 5x + 6 = 0.",
 "Checking answers, forming equations, and problems about unknown numbers.",
 ["Gives quick checks of solutions","Lets you form equations without expanding","Used in many exam questions"],
 ["Forgetting the minus sign in −b/a","Writing x² + (sum)x instead of x² − (sum)x","Not clearing fractions when asked for integer coefficients"],
 "Sum = −b/a, product = c/a; equation: x² − (sum)x + (product) = 0.");

eduAdd("algebraic_fractions","math",[],"Algebraic fractions",
 ["algebraic fraction","algebraic fractions","simplifying algebraic fractions","rational expressions","cancelling in algebra"],
 "An algebraic fraction has algebra on the top, the bottom, or both. You simplify it by factorising and cancelling common factors.",
 "It works like simplifying 6/9 to 2/3 by cancelling the common factor, but the factors are brackets.",
 ["Factorise the top and the bottom fully.","Cancel any common bracket (never cancel single terms).","To add or subtract, first write over a common denominator.","State any value of x that makes the bottom zero."],
 "(x² − 9) ÷ (x − 3) = (x − 3)(x + 3) ÷ (x − 3) = x + 3, for x ≠ 3.",
 "Simplifying formulas, solving equations and calculus.",
 ["Makes long expressions short","Needed for solving equations with fractions","Builds factorising skill"],
 ["Cancelling terms instead of factors","Forgetting that the bottom cannot be zero","Not factorising fully"],
 "Algebraic fractions: factorise, then cancel common factors.");

eduAdd("change_subject","math",["physics"],"Changing the subject of a formula",
 ["change the subject","changing the subject","make the subject","subject of a formula","rearranging formulae","rearranging formulas","transposition of formulae","transposing formulas"],
 "Changing the subject means rearranging a formula so that a different letter is on its own on one side.",
 "Think of undoing the steps in reverse order, like unwrapping a gift.",
 ["Identify the letter you want as the subject.","Undo additions and subtractions by doing the opposite to both sides.","Undo multiplication and division in the same way.","Undo powers by taking roots; keep the whole expression balanced."],
 "y = 3x + 2. Subtract 2: y − 2 = 3x. Divide by 3: x = (y − 2) ÷ 3. For v = u + at, subtract u and divide by t to get a = (v − u) ÷ t.",
 "Physics and chemistry formulas, geometry and finance.",
 ["Lets you use one formula for many questions","Needed in science","Builds equation-solving skill"],
 ["Not doing the same thing to both sides","Undoing steps in the wrong order","Forgetting brackets when dividing a whole side"],
 "Change the subject: undo the operations in reverse order, keeping both sides equal.");

/* ══════════════ ECONOMICS (secondary school) ══════════════ */
eduAdd("economics_overview","economics",[],"Economics",
 ["economics","what is economics","meaning of economics","study of economics"],
 "Economics is the study of how people, businesses and governments choose to use limited resources to satisfy unlimited wants.",
 "Think of a family budget: there is never enough money for everything, so you must choose. Economics is that idea for a whole country.",
 ["Wants are unlimited, but resources are scarce.","So people must make choices.","Every choice has an opportunity cost: the next best thing given up.","Markets and governments decide how resources are shared."],
 "A student has $5. Buying a snack means not buying airtime. The airtime given up is the opportunity cost of the snack.",
 "Government budgets, business decisions, household planning, jobs, prices and trade.",
 ["Helps you make better choices with limited money and time","Explains prices, jobs, inflation and trade","Useful for business, banking, government and daily life"],
 ["Thinking economics is only about money","Forgetting that every choice has an opportunity cost","Mixing up wants and needs"],
 "Economics = choosing how to use scarce resources.",
 Object.assign({overview:true}, EN_W));

eduAdd("scarcity_choice","economics",[],"Scarcity, choice and opportunity cost",
 ["scarcity and choice","scarcity","choice","opportunity cost","scale of preference","basic economic problems","wants and needs"],
 "Scarcity means resources are limited compared with human wants. Because of scarcity we must choose, and opportunity cost is the value of the best alternative we give up.",
 "If you can only eat one meal, the meal you did not eat is your opportunity cost.",
 ["Wants are unlimited; resources (land, labour, capital) are limited.","List your wants in order of importance (scale of preference).","Choose the most important ones first.","The next best alternative you give up is the opportunity cost."],
 "A farmer can plant maize or cassava on one plot. Choosing maize means the cassava harvest is given up: that is the opportunity cost. Every society must decide what to produce, how to produce and for whom.",
 "Budgets, production decisions, government spending and personal planning.",
 ["Helps you make wise choices","Shows that nothing is truly free","Basis of all economic decisions"],
 ["Saying opportunity cost is the money spent, not the best alternative given up","Confusing wants with needs","Forgetting that scarcity affects rich and poor countries"],
 "Scarcity forces choice; opportunity cost = the next best alternative given up.", EN_W);

eduAdd("factors_of_production","economics",[],"Factors of production",
 ["factors of production","land labour capital and entrepreneur","entrepreneur","entrepreneurship","resources of production","rent wages interest profit"],
 "Factors of production are the resources used to produce goods and services: land, labour, capital and entrepreneur.",
 "Think of a bakery: the shop space, the bakers, the ovens and the owner who takes the risk.",
 ["Land: natural resources such as soil, forests and minerals. It earns rent.","Labour: human effort, physical or mental. It earns wages.","Capital: man-made goods used to produce more goods (machines, buildings). It earns interest.","Entrepreneur: organises the other factors and takes the risk. It earns profit."],
 "In a bakery: the site is land, the bakers are labour, the ovens are capital, and the owner who started the business is the entrepreneur.",
 "Planning production, farming, manufacturing and starting a business.",
 ["Shows what is needed to produce anything","Helps you understand incomes (rent, wages, interest, profit)","Basis of production decisions"],
 ["Counting money as capital (capital in economics means man-made goods)","Forgetting the entrepreneur","Mixing up each factor's reward"],
 "Land, labour, capital, entrepreneur → rent, wages, interest, profit.", EN_W);

eduAdd("demand","economics",[],"Demand",
 ["demand","law of demand","demand curve","determinants of demand","change in demand","quantity demanded"],
 "Demand is the quantity of a good that consumers are willing and able to buy at different prices over a period of time.",
 "When your favourite drink gets cheaper, you buy more; when it gets expensive, you buy less.",
 ["Law of demand: when the price rises, quantity demanded falls (other things equal).","The demand curve slopes downward.","A price change causes a movement along the curve.","Other factors shift the whole curve: income, tastes, prices of related goods, population, expectations."],
 "If the price of rice rises from $50 to $70, people buy less rice. If incomes rise, people buy more rice at every price, so the demand curve shifts to the right.",
 "Pricing, business planning, government policy and market analysis.",
 ["Explains how prices affect buying","Helps businesses set prices","Basis of market analysis"],
 ["Mixing up a movement along the curve with a shift of the curve","Forgetting that demand needs ability to pay, not just desire","Ignoring 'other things equal'"],
 "Law of demand: higher price → lower quantity demanded.", EN_W);

eduAdd("supply","economics",[],"Supply",
 ["supply","law of supply","supply curve","determinants of supply","change in supply","quantity supplied"],
 "Supply is the quantity of a good that producers are willing and able to sell at different prices over a period of time.",
 "When the price is high, sellers want to sell more because it is more profitable.",
 ["Law of supply: when the price rises, quantity supplied rises (other things equal).","The supply curve slopes upward.","A price change causes a movement along the curve.","Other factors shift the curve: cost of production, technology, number of sellers, weather, taxes and subsidies."],
 "If the price of tomatoes rises, farmers plant and sell more. If fertiliser becomes cheaper, farmers can supply more at every price, so the supply curve shifts to the right.",
 "Production planning, farming, pricing and government policy such as subsidies.",
 ["Explains how sellers react to prices","Shows how costs affect production","Basis of market analysis"],
 ["Mixing up movement along the curve with a shift","Forgetting that supply is about sellers, not buyers","Ignoring costs and technology"],
 "Law of supply: higher price → higher quantity supplied.", EN_W);

eduAdd("equilibrium_price","economics",[],"Equilibrium price",
 ["equilibrium price","market equilibrium","equilibrium","price determination","surplus and shortage","market price","excess supply","excess demand"],
 "The equilibrium price is the price at which the quantity demanded equals the quantity supplied. It is where the demand and supply curves cross.",
 "It is the 'fair market' price at which every buyer who wants the good finds a seller, and nothing is left over.",
 ["Draw or list quantity demanded and quantity supplied at each price.","Find the price where they are equal: that is the equilibrium price and quantity.","Above equilibrium there is a surplus, so the price falls.","Below equilibrium there is a shortage, so the price rises."],
 "At $20, demand is 100 and supply is 100, so $20 is the equilibrium. At $30, demand is 70 and supply is 130: a surplus of 60, so sellers lower the price.",
 "Markets for food, fuel, housing, shares and any item that is bought and sold.",
 ["Explains how prices settle in markets","Predicts the effect of changes in demand or supply","Shows why surpluses and shortages disappear"],
 ["Confusing surplus with shortage","Forgetting that a demand shift changes both price and quantity","Thinking the price is fixed by sellers alone"],
 "Equilibrium: quantity demanded = quantity supplied.", EN_W);

eduAdd("elasticity","economics",[],"Price elasticity of demand",
 ["elasticity","price elasticity of demand","elasticity of demand","elastic and inelastic","price elasticity","elastic demand","inelastic demand"],
 "Price elasticity of demand measures how much the quantity demanded changes when the price changes.",
 "If the price of salt doubles, you still buy it (inelastic). If the price of a luxury doubles, many people stop buying it (elastic).",
 ["PED = % change in quantity demanded ÷ % change in price.","If PED is greater than 1, demand is elastic.","If PED is less than 1, demand is inelastic; if it equals 1, it is unitary.","Necessities tend to be inelastic; luxuries and goods with many substitutes tend to be elastic."],
 "A price rise of 10% causes the quantity demanded to fall by 20%. PED = 20 ÷ 10 = 2, so demand is elastic. If the seller raises the price, total revenue falls.",
 "Pricing decisions, taxation policy and business planning.",
 ["Helps firms decide whether to raise or lower prices","Helps governments decide which goods to tax","Shows how consumers respond to prices"],
 ["Ignoring the sign (PED is usually written as a positive number)","Mixing up elastic and inelastic","Forgetting that substitutes make demand more elastic"],
 "PED = % change in quantity demanded ÷ % change in price.", EN_W);

eduAdd("economic_systems","economics",["government"],"Economic systems",
 ["economic systems","economic system","market economy","planned economy","command economy","mixed economy","capitalism","socialism","free market economy"],
 "An economic system is the way a country decides what to produce, how to produce and for whom. The main types are market, planned (command) and mixed economies.",
 "A market economy is run by buyers and sellers, a planned economy by the government, and a mixed economy by both together.",
 ["Market economy: private ownership, prices decided by demand and supply, the aim is profit.","Planned (command) economy: the government owns the resources and decides production.","Mixed economy: both private firms and the government take part.","Most countries today, including Nigeria, are mixed economies."],
 "In a mixed economy, private companies sell phones and food, while the government provides roads, public schools and security.",
 "Understanding government policy, privatisation and the role of the state.",
 ["Explains how countries organise production","Helps compare countries","Basis of many policy debates"],
 ["Thinking any country is purely one system","Confusing capitalism with a mixed economy","Mixing up planned and market features"],
 "Market, planned and mixed economies decide what, how and for whom to produce.", EN_W);

eduAdd("money_banking","economics",[],"Money and banking",
 ["money","functions of money","banks","banking","central bank","commercial bank","commercial banks","medium of exchange","barter","types of banks"],
 "Money is anything generally accepted as payment for goods and services. Banks keep money safe, lend it, and help it move through the economy.",
 "Money solves the problem of barter, where you needed someone who wanted exactly what you had.",
 ["Functions of money: medium of exchange, unit of account, store of value, standard of deferred payment.","Commercial banks accept deposits, give loans and provide other services.","The central bank issues currency, controls the money supply and interest rates, and is banker to the government and to other banks.","Interest is the price of borrowing money."],
 "In barter, a farmer with yams must find someone who wants yams and has fish. With money, he sells the yams, then buys fish from anyone.",
 "Saving, borrowing, paying for goods and controlling inflation.",
 ["Makes trade easier and faster","Banks make saving safer and give access to loans","The central bank helps keep prices stable"],
 ["Mixing up the central bank and commercial banks","Forgetting the four functions of money","Thinking banks keep all deposits in the vault"],
 "Money = medium of exchange, unit of account, store of value; banks keep and lend it.", EN_W);

eduAdd("inflation","economics",[],"Inflation",
 ["inflation","deflation","causes of inflation","effects of inflation","cost of living","demand pull inflation","cost push inflation","rising prices","why prices rise","why do prices rise","prices go up","price increase","rise in prices"],
 "Inflation is a sustained rise in the general price level, which means money buys less than before.",
 "A bag of rice that cost $100 last year and costs $120 now shows 20% inflation.",
 ["Inflation rate = (new price − old price) ÷ old price × 100.","Demand-pull: too much money chasing too few goods.","Cost-push: producers' costs (wages, fuel, imports) rise, so prices rise.","Control: raise interest rates, reduce government spending or increase taxes, and increase production."],
 "Price of an item: $100 → $120. Inflation = (120 − 100) ÷ 100 × 100 = 20%.",
 "Wages, savings, interest rates, government policy and business planning.",
 ["Understanding it helps people protect their savings","Shows why central banks control interest rates","Explains rising living costs"],
 ["Thinking inflation means one price rising instead of the general level","Forgetting that savers and people on fixed incomes lose most","Mixing up inflation with deflation"],
 "Inflation = a sustained rise in the general price level.", EN_W);

eduAdd("national_income","economics",[],"National income and GDP",
 ["national income","gdp","gross domestic product","gnp","gross national product","economic growth","per capita income","standard of living"],
 "National income measures the total value of goods and services a country produces in a year. GDP counts production inside the country's borders.",
 "It is the country's yearly report card for production.",
 ["GDP = total value of final goods and services produced within a country in a year.","GNP = GDP + income earned from abroad − income paid abroad.","Per capita income = national income ÷ population.","Methods of calculation: output, income and expenditure."],
 "National income of 6,000 billion shared among 200 million people gives per capita income of 30,000 each (on average).",
 "Comparing countries, planning budgets and measuring economic growth.",
 ["Shows how fast an economy is growing","Allows comparison between countries and years","Helps in planning"],
 ["Counting intermediate goods (only final goods count)","Forgetting that GDP ignores unpaid and informal work","Thinking high GDP means everyone is rich"],
 "GDP = value of final goods and services produced in a country in a year.", EN_W);

eduAdd("international_trade","economics",["geography"],"International trade",
 ["international trade","comparative advantage","balance of payments","balance of trade","imports and exports","imports","exports","tariff","tariffs","trade barriers","free trade","protectionism"],
 "International trade is the buying and selling of goods and services between countries. Exports are sold abroad; imports are bought from abroad.",
 "No country has everything, so countries sell what they make best and buy the rest.",
 ["Countries differ in resources, climate and skills, so they specialise.","Comparative advantage: a country should produce what it can make at the lowest opportunity cost.","Balance of trade = value of exports − value of imports.","Trade barriers such as tariffs and quotas limit imports to protect local industries."],
 "A country with oil exports oil and imports machines. Its balance of trade is exports minus imports; a positive result is a surplus and a negative one is a deficit.",
 "Import and export policy, currency exchange, development and daily life.",
 ["Gives access to goods a country cannot produce","Increases competition and choice","Allows specialisation and efficiency"],
 ["Confusing balance of trade with balance of payments","Thinking imports are always bad","Mixing up tariffs and quotas"],
 "International trade = exchange between countries; comparative advantage explains why.", EN_W);

eduAdd("public_finance","economics",["government"],"Public finance and taxation",
 ["public finance","taxation","tax","taxes","government budget","budget","government revenue","direct and indirect taxes","public expenditure","canons of taxation","vat"],
 "Public finance is how the government raises money (revenue), spends it (expenditure) and plans it in a budget.",
 "The government is like a big household that must plan its income and spending every year.",
 ["Revenue comes mainly from taxes (income tax, company tax, VAT), plus fees, fines and other sources.","Direct taxes are paid by the person taxed (income tax); indirect taxes are paid through goods (VAT).","Expenditure is recurrent (salaries) or capital (roads, schools).","A budget is a surplus, deficit or balanced plan of revenue and spending."],
 "If revenue is 8 trillion and spending is 10 trillion, the budget has a deficit of 2 trillion, which must be covered by borrowing.",
 "Government services, infrastructure, public debt and economic policy.",
 ["Pays for schools, hospitals, roads and security","Helps redistribute income","Allows governments to influence the economy"],
 ["Mixing up direct and indirect taxes","Confusing recurrent and capital expenditure","Thinking tax is the only source of revenue"],
 "Public finance: revenue (mainly taxes), expenditure and the budget.", EN_W);

eduAdd("market_structures","economics",[],"Market structures",
 ["market structure","market structures","monopoly","perfect competition","oligopoly","monopolistic competition","price maker","price taker"],
 "A market structure describes how many firms sell in a market and how much power they have over price. The main types are perfect competition, monopoly, oligopoly and monopolistic competition.",
 "Compare a crowded food market where prices are similar with a single water supplier in a town.",
 ["Perfect competition: many sellers, identical products, easy entry. Firms are price takers.","Monopoly: one seller and barriers to entry. The firm is a price maker.","Oligopoly: a few large firms that react to each other's decisions.","Monopolistic competition: many sellers with slightly different products (for example restaurants)."],
 "If only one company supplies electricity in an area, it is a monopoly. Tomato sellers in a large market are close to perfect competition.",
 "Understanding prices, competition law and business strategy.",
 ["Explains why prices differ between markets","Shows how competition helps consumers","Basis of competition policy"],
 ["Thinking monopoly means a big firm (it means one seller)","Mixing up oligopoly and monopolistic competition","Forgetting barriers to entry"],
 "Market structure = how many sellers and how much power over price.", EN_W);

/* ══════════════ GOVERNMENT AND CIVIC EDUCATION ══════════════ */
eduAdd("government_overview","government",[],"Government",
 ["government","what is government","meaning of government","functions of government","state and government","state","nation"],
 "Government is the group of people who have the authority to make and enforce laws and to run the affairs of a state.",
 "A state is the country; the government is the team that runs it for the time being.",
 ["A state has people, territory, government and sovereignty.","A government makes laws, enforces them and settles disputes.","Governments also protect lives and property and provide services.","Governments change; the state continues."],
 "When a new president is elected, the government changes, but the state of Nigeria stays the same.",
 "Understanding politics, law, elections and public services.",
 ["Keeps law and order","Provides services such as roads, schools and security","Protects citizens' rights"],
 ["Mixing up state, nation and government","Thinking government only means the president","Forgetting that governments are accountable to the people"],
 "Government = the people who make and enforce laws in a state.",
 Object.assign({overview:true}, EN_W));

eduAdd("democracy","government",[],"Democracy",
 ["democracy","democratic government","direct democracy","representative democracy","features of democracy","principles of democracy","types of democracy"],
 "Democracy is a system of government in which power belongs to the people, who exercise it directly or through elected representatives.",
 "In a democracy the people are the bosses, and the government works for them.",
 ["Free and fair elections choose the leaders.","The rule of law applies to everyone, including the government.","Citizens' rights are protected and the press is free.","Direct democracy: people vote on issues themselves. Representative democracy: people elect representatives."],
 "In a representative democracy, voters elect members of the legislature to make laws for them.",
 "Elections, constitutions, citizens' rights and public debate.",
 ["Protects freedom and rights","Allows citizens to change leaders peacefully","Makes government accountable"],
 ["Thinking democracy means only voting","Forgetting minority rights and the rule of law","Mixing up direct and representative democracy"],
 "Democracy = government by the people, directly or through elected representatives.", EN_W);

eduAdd("forms_of_government","government",[],"Forms and systems of government",
 ["forms of government","types of government","systems of government","monarchy","dictatorship","republic","autocracy","oligarchy","presidential system","parliamentary system","absolute monarchy","constitutional monarchy"],
 "A form of government describes who holds power and how it is used. Examples are monarchy, republic, dictatorship and oligarchy.",
 "It answers: who rules, and how are they chosen?",
 ["Monarchy: rule by a king or queen (absolute or constitutional).","Republic: the head of state is elected, not hereditary.","Dictatorship (autocracy): one person holds all power; oligarchy: a small group rules.","Presidential system: the president is both head of state and government; in a parliamentary system the prime minister leads the government."],
 "Nigeria is a republic with a presidential system. The United Kingdom is a constitutional monarchy with a parliamentary system.",
 "Comparing countries, studying constitutions and understanding political change.",
 ["Helps compare how countries are governed","Explains where power lies","Basis for studying constitutions"],
 ["Mixing up monarchy and dictatorship","Thinking a republic cannot be undemocratic","Confusing presidential and parliamentary systems"],
 "Forms of government: who rules and how they are chosen.", EN_W);

eduAdd("constitution","government",[],"Constitution",
 ["constitution","written constitution","unwritten constitution","rigid and flexible constitution","constitutional government","sources of a constitution","1999 constitution","constitutional amendment"],
 "A constitution is the supreme law of a country. It sets out how the government is organised, the powers of each institution and the rights of citizens.",
 "It is the rule book that even the government must follow.",
 ["It states how the government is structured and its powers.","It guarantees citizens' rights and duties.","It can be written (one document) or unwritten (found in laws and customs).","Rigid constitutions are hard to amend; flexible ones are easy to amend."],
 "Nigeria's current constitution is the 1999 Constitution (as amended). It is written and rigid, so changing it needs a special process.",
 "Law, elections, rights and the limits of government power.",
 ["Limits government power","Protects citizens' rights","Gives a stable framework for government"],
 ["Mixing up written and rigid (they are different things)","Thinking a constitution can be changed like an ordinary law","Forgetting that it is the supreme law"],
 "Constitution = the supreme law that organises government and protects rights.", EN_W);

eduAdd("separation_of_powers","government",[],"Separation of powers",
 ["separation of powers","arms of government","legislature","executive","judiciary","checks and balances","three arms of government","legislative arm","judicial arm"],
 "Separation of powers divides government into three arms: the legislature makes laws, the executive carries them out, and the judiciary interprets them.",
 "Three people share the jobs so that no single person controls everything.",
 ["Legislature: makes laws (in Nigeria, the National Assembly: Senate and House of Representatives).","Executive: enforces laws and runs the government (the president and ministers).","Judiciary: interprets laws and settles disputes (the courts, with the Supreme Court at the top).","Checks and balances let each arm limit the others, for example judicial review or impeachment."],
 "If a law passed by the legislature breaks the constitution, the courts can declare it invalid. This is a check on the legislature.",
 "Protecting freedom, preventing abuse of power and understanding how governments work.",
 ["Prevents any one person from having too much power","Protects citizens' rights","Makes government accountable"],
 ["Mixing up the roles of the three arms","Thinking the arms never overlap or check each other","Confusing separation of powers with federalism"],
 "Separation of powers: legislature makes, executive enforces, judiciary interprets.", EN_W);

eduAdd("federalism","government",[],"Federalism and unitary government",
 ["federalism","federal system","federal government","unitary system","unitary government","confederation","federal and unitary","federal constitution","revenue allocation"],
 "In a federal system, power is shared between a central government and regional governments, each with its own area of authority. In a unitary system, power is concentrated in the central government.",
 "Federalism is like a school where the principal and the class teachers each have their own responsibilities.",
 ["The constitution divides powers between the central and regional governments.","Federal: for example Nigeria (36 states plus the Federal Capital Territory) and the USA.","Unitary: the central government holds the power and may create local units (for example France).","Confederation is a loose union of independent states."],
 "In a federation, the national government handles defence and currency, while state governments handle local matters set out in the constitution.",
 "Studying constitutions and arguments about power, resources and diversity.",
 ["Fits countries with many ethnic groups and regions","Brings government closer to the people","Allows different regions to make local decisions"],
 ["Mixing up federation and confederation","Thinking states in a federation are completely independent","Forgetting that the constitution divides the powers"],
 "Federalism = power shared between central and regional governments.", EN_W);

eduAdd("rule_of_law","government",[],"Rule of law",
 ["rule of law","supremacy of the law","equality before the law","judicial independence","independence of the judiciary","dicey"],
 "The rule of law means that everyone, including the government, is subject to the law, and that laws are applied fairly and equally.",
 "No one is above the law: not the poor, not the rich, not the president.",
 ["Law is supreme: government acts only according to law.","Equality before the law: all citizens are treated equally by the courts.","Nobody can be punished without a fair trial.","An independent judiciary protects the rule of law."],
 "If an official breaks the law, they can be taken to court like any other citizen.",
 "Courts, human rights, police conduct and democratic government.",
 ["Protects citizens from abuse of power","Gives fairness and order","Basis of democracy and justice"],
 ["Thinking it only applies to ordinary citizens","Forgetting that exceptions exist (for example diplomatic immunity)","Confusing it with 'rule by law'"],
 "Rule of law = everyone, including government, is under the law.", EN_W);

eduAdd("citizenship_rights","government",[],"Citizenship, rights and duties",
 ["citizenship","citizen","rights and duties of citizens","human rights","fundamental human rights","duties of citizens","civic responsibility","civic education","obligations of citizens","acquiring citizenship"],
 "A citizen is a person who legally belongs to a state and has rights and duties in it.",
 "Citizenship is membership: you enjoy the benefits and you also carry responsibilities.",
 ["Ways of acquiring citizenship include birth, registration and naturalisation.","Rights are freedoms protected by law: life, liberty, fair hearing, expression, movement, and others.","Duties are things citizens must do: obey the law, pay taxes, vote, respect others, protect public property, defend the country.","In Nigeria, fundamental rights are set out in Chapter IV of the Constitution."],
 "The right to vote comes with the duty to vote responsibly, and the right to free expression comes with the duty to respect others' rights.",
 "Elections, community life, law and school civic education.",
 ["Gives citizens protection and a voice","Builds responsible communities","Makes democracy work"],
 ["Thinking rights have no limits","Forgetting that duties come with rights","Mixing up citizenship by birth and by naturalisation"],
 "Citizens have rights and duties.", EN_W);

eduAdd("elections_parties","government",[],"Elections and political parties",
 ["elections","election","electoral process","political parties","political party","electoral commission","voting","suffrage","types of election","one party system","multi party system","two party system","inec","by election","primaries"],
 "An election is the process by which citizens choose their leaders. Political parties organise people with similar ideas to contest for power.",
 "Elections let the people hire and fire their leaders.",
 ["Voters are registered and parties choose candidates (primaries).","Campaigns explain the parties' plans.","Voting, counting and announcement of results are done by an electoral commission (INEC in Nigeria).","Systems: one-party, two-party or multi-party; types of election: general, by-election and referendum."],
 "In a general election, voters choose the president, governors and legislators. A by-election fills a single vacant seat.",
 "Choosing leaders, democracy, campaigns and political participation.",
 ["Gives citizens power to choose and remove leaders","Gives a peaceful way to change government","Allows different ideas to compete"],
 ["Confusing a general election with a by-election","Thinking parties exist only to win power (they also represent ideas)","Forgetting the role of the electoral commission"],
 "Election = citizens choose leaders; parties organise the contest.", EN_W);

eduAdd("good_governance_corruption","government",[],"Good governance and corruption",
 ["good governance","corruption","accountability","transparency","effects of corruption","anti corruption","causes of corruption","efcc","icpc","bribery","embezzlement","nepotism"],
 "Good governance means running a country openly, fairly and responsibly. Corruption is the abuse of public office for private gain.",
 "Good governance is a clear glass window; corruption is a curtain that hides wrongdoing.",
 ["Good governance: transparency, accountability, participation, rule of law and responsiveness.","Corruption includes bribery, embezzlement, nepotism and electoral fraud.","Effects: wasted public money, poor services, weak trust and slow development.","Remedies: strong institutions, honest leaders, a free press, public awareness and anti-corruption agencies (EFCC and ICPC in Nigeria)."],
 "A contractor who bribes an official to win a road contract and then builds a poor road is an example of corruption that harms everyone.",
 "Public services, elections, business and community life.",
 ["Good governance builds trust and development","Understanding corruption helps citizens demand accountability","Strong institutions reduce corruption"],
 ["Thinking corruption only means bribes (it has many forms)","Forgetting that citizens can help fight it","Mixing up transparency and accountability"],
 "Good governance = open, fair, accountable government; corruption = abuse of office for private gain.", EN_W);

eduAdd("local_government","government",[],"Local government",
 ["local government","local government council","functions of local government","decentralisation","local government area","councillors","third tier of government"],
 "Local government is the level of government closest to the people. It looks after local matters in a town, district or community.",
 "If the federal government is the national headquarters and the state is the regional office, the local government is the neighbourhood branch.",
 ["It is the third tier of government, below the federal and state governments.","Functions include markets, motor parks, local roads, sanitation, primary health care and registering births and deaths.","It is led by a chairman or mayor and a council of elected councillors.","Money comes from allocations from higher governments, local rates and fees."],
 "A local government council might repair local roads, manage a market and keep the community clean.",
 "Community development, local services and grassroots politics.",
 ["Brings government close to the people","Provides local services","Trains citizens in leadership and participation"],
 ["Mixing up local government with state government","Forgetting that it depends on funds from higher government","Thinking it has no elected leaders"],
 "Local government = the level of government closest to the people.", EN_W);

eduAdd("international_organisations","government",["geography"],"International organisations",
 ["international organisations","united nations","african union","ecowas","commonwealth","opec","international organizations","security council","league of nations"],
 "International organisations are groups of countries that work together on peace, trade, development and other shared goals.",
 "Countries join clubs like these to solve problems no single country can solve alone.",
 ["United Nations (1945): promotes peace, human rights and development; organs include the General Assembly, the Security Council and the International Court of Justice.","African Union (replaced the OAU in 2002): promotes unity and development in Africa.","ECOWAS (1975): promotes economic cooperation among West African states.","OPEC (1960): coordinates oil policies of member countries."],
 "UN peacekeepers help to keep peace in conflict areas, and ECOWAS has worked to support peace and trade in West Africa.",
 "Peacekeeping, trade, development and diplomacy.",
 ["Help countries cooperate to keep peace","Support trade and development","Give smaller countries a voice"],
 ["Mixing up the UN, AU and ECOWAS","Forgetting the five permanent members of the Security Council (China, France, Russia, the United Kingdom, the USA)","Thinking these bodies can force any country to act"],
 "International organisations = countries cooperating on shared goals.", EN_W);

/* ══════════════ GEOGRAPHY (secondary school) ══════════════ */
eduAdd("geography_overview","geography",[],"Geography",
 ["geography","what is geography","meaning of geography","physical and human geography","branches of geography"],
 "Geography is the study of the Earth: its land, climate and resources, and how people live on it and use it.",
 "Geography asks 'where is it, why is it there, and how does it affect people?'.",
 ["Physical geography: landforms, climate, rivers, soils and vegetation.","Human geography: population, settlement, farming, industry and trade.","Maps, graphs and fieldwork are the main tools.","Geography links the natural environment with human activities."],
 "A map showing rainfall and farming in a region helps explain why crops grow in some places and not others.",
 "Planning cities, farming, disaster management, tourism, environmental protection and map-making.",
 ["Helps you understand the world and its problems","Useful for planning and environmental decisions","Links science and society"],
 ["Thinking geography is only memorising places","Mixing up physical and human geography","Ignoring maps and data"],
 "Geography = the Earth and how people use it.",
 Object.assign({overview:true}, EN_W));

eduAdd("map_reading","geography",[],"Map reading",
 ["map reading","reading maps","map scale","scale of a map","contour lines","contours","grid reference","compass direction","compass directions","map symbols","topographic map","representative fraction"],
 "Map reading is understanding the information on a map: direction, distance, scale, height and symbols.",
 "A map is a small picture of a large area, and the scale tells you how small.",
 ["Direction: use the compass (north, south, east, west) and bearings.","Scale: 1 cm on the map = a certain distance on the ground (for example 1:50,000).","Contour lines join points of equal height; close lines mean a steep slope, wide lines a gentle slope.","Use the key (legend) to understand symbols, and grid references to find places."],
 "On a map with scale 1:50,000, a distance of 4 cm on the map is 4 × 50,000 = 200,000 cm = 2 km on the ground.",
 "Navigation, planning roads and settlements, hiking and surveying.",
 ["Helps you find places and plan journeys","Shows relief and distance","Basic skill for geography exams"],
 ["Forgetting to convert cm to km","Mixing up close and wide contour lines","Ignoring the key"],
 "Map reading: direction, scale, contours, symbols.", EN_W);

eduAdd("latitude_longitude","geography",[],"Latitude and longitude",
 ["latitude and longitude","latitude","longitude","equator","prime meridian","time zones","greenwich meridian","lines of latitude","lines of longitude","tropics"],
 "Latitude and longitude are imaginary lines used to give the exact position of any place on Earth.",
 "Together they work like the row and column of a grid over the globe.",
 ["Lines of latitude run east-west and measure how far north or south of the Equator (0°) a place is.","Lines of longitude run north-south and measure how far east or west of the Prime Meridian (0°, through Greenwich) a place is.","The Earth turns 360° in 24 hours, so every 15° of longitude is 1 hour of time.","Important latitudes: Tropic of Cancer (23½°N), Equator (0°), Tropic of Capricorn (23½°S)."],
 "A place 30° east of Greenwich is 30 ÷ 15 = 2 hours ahead of Greenwich time. Nigeria lies between about 4°N and 14°N.",
 "Navigation, time zones, climate zones and map work.",
 ["Gives the exact location of any place","Explains time differences","Helps explain climate patterns"],
 ["Mixing up latitude and longitude","Forgetting the 15° = 1 hour rule","Forgetting whether a place is north or south, east or west"],
 "Latitude = north-south position; longitude = east-west position.", EN_W);

eduAdd("weather_climate","geography",[],"Weather and climate",
 ["weather and climate","weather","climate","elements of weather","weather instruments","types of rainfall","relief rainfall","convectional rainfall","frontal rainfall","rainfall","stevenson screen","rain gauge"],
 "Weather is the state of the atmosphere at a place over a short time. Climate is the average weather over many years (about 30).",
 "Weather is what you wear today; climate is what clothes are in your wardrobe.",
 ["Elements of weather: temperature, rainfall, humidity, wind, pressure and sunshine.","Instruments: thermometer, rain gauge, barometer, anemometer, wind vane and hygrometer, kept in a Stevenson screen.","Types of rainfall: convectional (heating of the ground), relief (air forced up mountains) and cyclonic or frontal (warm and cold air meet).","Climate depends on latitude, altitude, distance from the sea and ocean currents."],
 "A hot afternoon storm in the tropics is convectional rainfall: the sun heats the ground, warm air rises, cools and forms rain.",
 "Farming, planning, aviation and disaster warnings.",
 ["Helps farmers choose crops and plant times","Helps in planning and safety","Explains why places differ"],
 ["Mixing up weather and climate","Confusing the types of rainfall","Forgetting that climate is an average over many years"],
 "Weather = short term; climate = long-term average.", EN_W);

eduAdd("climate_vegetation_zones","geography",[],"Climate and vegetation zones",
 ["climate zones","climatic regions","vegetation zones","vegetation belts","vegetation","natural vegetation","rainforest","tropical rainforest","savanna","savannah","desert","equatorial climate","tropical climate","sahel","mangrove"],
 "Climate and vegetation are linked: temperature and rainfall decide what plants grow in a region, which gives belts or zones across the land.",
 "Move away from the Equator and the rainfall usually decreases, so tall forests change into grass and finally desert.",
 ["Equatorial and tropical rainforest: hot and wet all year, tall trees in layers.","Savanna: wet and dry seasons, grass with scattered trees.","Sahel and desert: very little rain, short grass and shrubs.","In Nigeria the belts run from mangrove and rainforest near the coast to savanna and Sahel in the north."],
 "Moving north in Nigeria, you pass from mangrove swamp and rainforest, to Guinea savanna, Sudan savanna and then the Sahel.",
 "Farming, forestry, wildlife, tourism and climate studies.",
 ["Shows how climate controls plant life","Helps explain farming patterns","Helps in land planning"],
 ["Mixing up savanna and rainforest features","Forgetting that rainfall decreases away from the coast in West Africa","Confusing climate zones with vegetation zones"],
 "Climate (temperature and rainfall) decides vegetation zones.", EN_W);

eduAdd("rocks","geography",["chemistry"],"Rocks and the rock cycle",
 ["rocks","types of rocks","igneous rocks","sedimentary rocks","metamorphic rocks","rock cycle","minerals","igneous","sedimentary","metamorphic"],
 "Rocks are natural solid materials made of minerals. The three main types are igneous, sedimentary and metamorphic.",
 "Rocks are recycled over millions of years: they melt, form again, get buried and change.",
 ["Igneous rocks form when molten rock (magma or lava) cools and hardens, for example granite and basalt.","Sedimentary rocks form from layers of sediments pressed together, for example sandstone and limestone, and may contain fossils.","Metamorphic rocks form when heat and pressure change existing rocks, for example marble from limestone.","The rock cycle shows how each type can change into another."],
 "Limestone (sedimentary) buried under heat and pressure can become marble (metamorphic).",
 "Building materials, mining, farming soils and understanding Earth's history.",
 ["Gives us building stone, minerals and fuel","Explains landscapes and soils","Shows Earth's history through fossils"],
 ["Mixing up the three types","Thinking fossils are found in all rock types","Forgetting that the rock cycle is continuous"],
 "Igneous (cooled magma), sedimentary (layers), metamorphic (changed by heat and pressure).", EN_W);

eduAdd("weathering_erosion","geography",[],"Weathering and erosion",
 ["weathering","erosion","types of weathering","agents of erosion","mass movement","deposition","physical weathering","chemical weathering","biological weathering"],
 "Weathering is the breaking down of rock where it is. Erosion is the wearing away and carrying of rock material by water, wind, ice or gravity.",
 "Weathering breaks the rock; erosion carries the pieces away.",
 ["Physical weathering breaks rocks without changing them, for example by heating and cooling or freezing water.","Chemical weathering changes rocks, for example acid rain dissolving limestone.","Biological weathering is caused by plant roots and animals.","Agents of erosion: running water, wind, waves, ice and gravity; the material is later deposited."],
 "In a hot desert, rocks heat in the day and cool at night, expanding and shrinking until they crack. This is physical weathering.",
 "Soil formation, landforms, farming and construction.",
 ["Explains how soils and landscapes form","Helps in soil conservation","Helps predict landslides"],
 ["Mixing up weathering and erosion","Forgetting that erosion needs movement","Thinking weathering happens only in cold places"],
 "Weathering breaks rock; erosion removes it.", EN_W);

eduAdd("rivers","geography",[],"Rivers and river processes",
 ["rivers","river processes","river erosion","river transport","river deposition","river basin","drainage basin","waterfall","meander","delta","river valley","oxbow lake","tributary","river course"],
 "A river is a natural stream of water flowing from high ground to a lake or the sea. Rivers erode, transport and deposit material, and shape the land.",
 "A river is a conveyor belt: it picks up material in the hills, carries it, and drops it near the sea.",
 ["Upper course: steep slopes, fast flow, V-shaped valleys, waterfalls and rapids (erosion).","Middle course: wider valley, meanders form (erosion and deposition).","Lower course: wide floodplain, oxbow lakes and deltas (deposition).","A river basin is the area drained by a river and its tributaries."],
 "The River Niger and River Benue join at Lokoja, and the Niger forms a large delta where it reaches the Atlantic Ocean.",
 "Water supply, farming, transport, hydroelectric power and flood control.",
 ["Provide water, fish, transport and power","Create fertile floodplains","Help explain landforms"],
 ["Mixing up erosion and deposition","Forgetting which landforms belong to which course","Thinking rivers carry only water"],
 "Rivers erode, transport and deposit, changing from upper to lower course.", EN_W);

eduAdd("plate_tectonics","geography",["physics"],"Plate tectonics, earthquakes and volcanoes",
 ["plate tectonics","earthquakes","earthquake","volcanoes","volcano","structure of the earth","continental drift","fold mountains","faults","tectonic plates","layers of the earth","seismic waves"],
 "The Earth's crust is broken into large plates that move slowly. Where plates meet, earthquakes, volcanoes and mountains form.",
 "Imagine a cracked eggshell floating on a hot liquid: the pieces slowly slide, bump and pull apart.",
 ["Layers: crust, mantle (partly molten rock) and core.","Divergent boundaries: plates move apart and new crust forms.","Convergent boundaries: plates collide, forming fold mountains, volcanoes and trenches.","Earthquakes happen when stress along faults is suddenly released; the focus is underground and the epicentre is directly above it on the surface."],
 "Fold mountains such as the Himalayas formed where two plates collided and pushed the land upwards.",
 "Disaster planning, building design, mining and understanding landforms.",
 ["Explains mountains, earthquakes and volcanoes","Helps in planning safer buildings","Shows how the Earth changes"],
 ["Mixing up focus and epicentre","Thinking plates move quickly","Confusing the types of plate boundary"],
 "Moving plates cause earthquakes, volcanoes and fold mountains.", EN_W);

eduAdd("population_geography","geography",[],"Population",
 ["population","population distribution","population density","migration","urbanisation","urbanization","birth rate and death rate","population growth","population pyramid","census","rural urban migration","push and pull factors","overpopulation"],
 "Population geography studies how many people live in a place, where they live and how the numbers change.",
 "It is the story of who lives where, and why.",
 ["Population density = number of people ÷ area (people per km²).","Population change depends on birth rate, death rate and migration.","Migration is moved by push factors (poverty, conflict) and pull factors (jobs, services).","A population pyramid shows the age and sex structure; a wide base means many young people."],
 "A town with 50,000 people on 25 km² has a density of 50,000 ÷ 25 = 2,000 people per km².",
 "Planning schools, hospitals, housing and jobs.",
 ["Helps governments plan services","Explains migration and city growth","Shows age structure and needs"],
 ["Mixing up density and total population","Forgetting that migration affects population change","Misreading population pyramids"],
 "Population = how many, where and how it changes.", EN_W);

eduAdd("agriculture_geography","geography",["economics"],"Agriculture and farming systems",
 ["agriculture","farming","types of farming","subsistence farming","commercial farming","shifting cultivation","cash crops","irrigation","mixed farming","plantation","crop rotation","livestock farming"],
 "Agriculture is the cultivation of crops and the rearing of animals. Farming systems differ in size, purpose and methods.",
 "Some farmers grow food mainly for their family; others grow crops mainly to sell.",
 ["Subsistence farming: small farms, food mainly for the family.","Commercial farming: large scale, crops and animals for sale (cash crops such as cocoa and groundnuts).","Shifting cultivation: farmers move to new land when the soil is exhausted.","Irrigation, crop rotation and fertilisers improve yields; mixed farming combines crops and livestock."],
 "A farmer who grows cocoa and sells it for export is practising commercial farming of a cash crop.",
 "Food supply, income, raw materials for industry and rural development.",
 ["Provides food and raw materials","Gives jobs and income","Earns foreign exchange through exports"],
 ["Mixing up subsistence and commercial farming","Forgetting that shifting cultivation needs plenty of land","Ignoring soil conservation"],
 "Agriculture: crops and animals; subsistence vs commercial.", EN_W);

eduAdd("natural_resources_mining","geography",["economics","chemistry"],"Natural resources and mining",
 ["natural resources","mining","minerals and mining","crude oil","petroleum","renewable and non renewable resources","energy resources","forestry","fishing","fossil fuels","renewable resources","non renewable resources"],
 "Natural resources are materials from nature that people use, such as water, soil, forests, minerals and fuels.",
 "They are the Earth's savings account: some refill, some do not.",
 ["Renewable resources can be replaced naturally (forests, fish, water, solar and wind energy).","Non-renewable resources run out (crude oil, coal, natural gas, metal ores).","Mining removes minerals from the ground by open-cast or underground methods.","Nigeria's crude oil comes mainly from the Niger Delta area."],
 "Crude oil is refined into petrol, diesel and kerosene. Since it takes millions of years to form, it is a non-renewable resource.",
 "Energy, industry, building, export income and daily life.",
 ["Provide energy, materials and income","Support industries and jobs","Renewable resources can last if managed well"],
 ["Mixing up renewable and non-renewable","Ignoring the environmental damage of mining","Forgetting the need for conservation"],
 "Natural resources: renewable can be replaced, non-renewable cannot.", EN_W);

eduAdd("environmental_problems","geography",["biology"],"Environmental problems",
 ["environmental problems","desertification","deforestation","soil erosion","environmental pollution","land degradation","flooding","conservation","sustainable development","environmental degradation","erosion control","gully erosion","oil spill"],
 "Environmental problems are harmful changes to the natural environment, often caused by human activities.",
 "When we use nature faster than it can recover, problems appear.",
 ["Deforestation: clearing forests for farming, wood and building.","Desertification: land turning into desert because of drought, overgrazing and tree cutting, a serious problem in northern Nigeria and the Sahel.","Soil erosion and flooding come from poor land use and heavy rain.","Solutions: tree planting, conservation, proper waste disposal and sustainable development."],
 "Cutting trees for firewood on a hillside leaves the soil bare, and heavy rain washes the soil away. This leads to gully erosion.",
 "Farming, planning, health and the protection of future generations.",
 ["Understanding problems helps us solve them","Protects soil, water and air","Supports sustainable development"],
 ["Mixing up weather changes and human causes","Forgetting that solutions need people's cooperation","Thinking only governments can act"],
 "Environmental problems come from using nature faster than it recovers.", EN_W);

eduAdd("climate_change","geography",["chemistry","physics"],"Climate change and global warming",
 ["climate change","global warming","greenhouse effect","greenhouse gases","ozone layer","effects of global warming","carbon dioxide emissions","sea level rise","renewable energy"],
 "Climate change is a long-term change in the Earth's climate. Global warming is the recent rise in average temperatures, mainly from increased greenhouse gases.",
 "Greenhouse gases act like a blanket around the Earth: too much of it, and the Earth gets too warm.",
 ["The greenhouse effect is natural: gases such as carbon dioxide and methane trap heat.","Burning fossil fuels and cutting forests add extra greenhouse gases.","Effects: rising temperatures, melting ice, rising sea levels, droughts, floods and stronger storms.","Solutions: renewable energy, planting trees, saving energy and international agreements."],
 "Burning petrol in a car releases carbon dioxide. More carbon dioxide in the air traps more heat and warms the planet.",
 "Weather, farming, coastal cities, energy policy and international agreements.",
 ["Understanding it helps people and governments act","Encourages clean energy","Protects coastal areas and farmland"],
 ["Mixing up the ozone hole and global warming (they are different problems)","Thinking the greenhouse effect itself is bad (the natural effect keeps Earth warm)","Forgetting that individuals and governments both matter"],
 "Global warming = rising temperatures caused by extra greenhouse gases.", EN_W);


/* ══════════════ MORE SECONDARY BIOLOGY ══════════════ */
eduAdd("food_nutrition","biology",["biochemistry"],"Food classes and balanced diet",
 ["food classes","balanced diet","nutrition","nutrients","classes of food","vitamins and minerals","malnutrition","deficiency diseases","food tests","kwashiorkor","scurvy","rickets","why we need food","importance of food","functions of food","why do we eat"],
 "Food classes are the groups of nutrients the body needs: carbohydrates, proteins, fats, vitamins, minerals, water and fibre. A balanced diet contains all of them in the right amounts.",
 "Food is the body's fuel, building material and repair kit.",
 ["Carbohydrates give energy; fats store energy; proteins build and repair the body.","Vitamins and minerals protect the body and keep it working (for example vitamin C prevents scurvy; calcium builds bones).","Water carries substances; fibre helps digestion.","Poor diet causes deficiency diseases such as kwashiorkor (lack of protein), rickets (vitamin D) and anaemia (iron)."],
 "A meal of rice (carbohydrate), beans (protein), vegetables (vitamins and fibre) and a little oil (fat) is more balanced than rice alone.",
 "Health, school meals, farming and hospital care.",
 ["Keeps the body healthy and growing","Prevents deficiency diseases","Gives energy for work and study"],
 ["Mixing up the functions of carbohydrates and proteins","Forgetting water and fibre","Thinking a big meal is the same as a balanced meal"],
 "Balanced diet = all seven food classes in the right amounts.", EN_W);

eduAdd("circulatory_system","biology",[],"Circulatory system",
 ["circulatory system","blood circulation","heart","blood vessels","blood","blood groups","arteries and veins","double circulation","transport in humans","transport system","capillaries","red blood cells","white blood cells","plasma"],
 "The circulatory system transports blood around the body. It is made of the heart, blood vessels and blood.",
 "The heart is a pump, the vessels are pipes, and the blood is the delivery van.",
 ["The heart pumps blood. It has four chambers: two atria and two ventricles.","Arteries carry blood away from the heart; veins carry blood back; capillaries link them and let substances pass into cells.","Blood contains red cells (carry oxygen), white cells (fight infection), platelets (clotting) and plasma (carries nutrients and waste).","Double circulation: blood goes to the lungs, returns to the heart, then goes to the body."],
 "Oxygen from the lungs binds to haemoglobin in red blood cells and is carried by the blood to the muscles.",
 "Medicine, blood donation, exercise and health.",
 ["Delivers oxygen and food to every cell","Removes carbon dioxide and wastes","Helps fight disease and control temperature"],
 ["Mixing up arteries and veins","Thinking the right and left sides of the heart carry the same blood","Forgetting that capillaries are where exchange happens"],
 "Circulation: heart pumps blood through arteries, capillaries and veins.", EN_W);

eduAdd("gas_exchange","biology",[],"Breathing and gas exchange",
 ["gas exchange","breathing","respiratory system","lungs","gaseous exchange","ventilation","alveoli","breathing in and out","trachea","diaphragm","respiratory organs"],
 "Breathing moves air in and out of the lungs. Gas exchange is the movement of oxygen into the blood and carbon dioxide out of it.",
 "The lungs are like a pair of balloons with a huge surface for swapping gases.",
 ["Air enters through the nose and mouth, down the trachea and bronchi into the lungs.","Inhaling: the diaphragm contracts and flattens, the ribs move up and out, and air is drawn in.","Exhaling: the diaphragm relaxes, the ribs move down and in, and air is pushed out.","In the alveoli, oxygen diffuses into the blood and carbon dioxide diffuses out."],
 "At rest we breathe about 12 to 20 times a minute. During exercise breathing becomes faster and deeper to supply more oxygen.",
 "Exercise, health, asthma and smoking education.",
 ["Supplies oxygen for respiration","Removes carbon dioxide","Alveoli give a very large surface for exchange"],
 ["Mixing up breathing and respiration (breathing moves air; respiration releases energy)","Forgetting that the diaphragm contracts when we breathe in","Confusing inhaled and exhaled air"],
 "Breathing moves air; gas exchange swaps oxygen and carbon dioxide in the alveoli.", EN_W);

eduAdd("excretion","biology",[],"Excretion and the kidneys",
 ["excretion","excretory system","kidney","kidneys","urinary system","urine formation","nephron","skin and excretion","homeostasis","osmoregulation","excretory organs","urea"],
 "Excretion is the removal of waste products of metabolism from the body. The kidneys filter the blood and make urine.",
 "The kidneys are the body's filters, keeping what is useful and removing what is not.",
 ["Main excretory organs: kidneys (urea and water), lungs (carbon dioxide) and skin (sweat).","Blood enters the kidney, which filters out urea, extra water and salts.","Useful substances such as glucose are taken back into the blood.","Urine flows from the kidneys through the ureters to the bladder and out through the urethra."],
 "If you drink very little water, the kidneys make a small amount of dark urine to save water in the body.",
 "Health, hydration, dialysis and kidney disease.",
 ["Removes poisonous wastes like urea","Controls the water and salt balance of the body","Helps keep the internal environment stable"],
 ["Mixing up excretion and egestion (egestion removes undigested food)","Forgetting that lungs and skin also excrete","Thinking urine is made in the bladder"],
 "Excretion = removing metabolic wastes; kidneys filter blood.", EN_W);

eduAdd("diffusion_osmosis","biology",["chemistry"],"Diffusion, osmosis and active transport",
 ["diffusion","osmosis","diffusion and osmosis","active transport","passive transport","movement of substances across membranes","water potential","semi permeable membrane","partially permeable membrane","concentration gradient"],
 "Diffusion is the movement of particles from a region of high concentration to low concentration. Osmosis is the diffusion of water through a partially permeable membrane. Active transport moves substances against the gradient and needs energy.",
 "A drop of ink spreads in water by itself; this is diffusion.",
 ["Diffusion: particles move down a concentration gradient and no energy is needed.","Osmosis: water moves from a dilute solution to a more concentrated one through a membrane.","Active transport: cells use energy (ATP) to move substances from low to high concentration.","Examples: oxygen enters blood by diffusion; plant roots absorb water by osmosis and minerals by active transport."],
 "A potato strip placed in strong salt solution becomes soft because water leaves its cells by osmosis. In pure water it becomes firm.",
 "Plant water uptake, kidneys, gas exchange and food preservation.",
 ["Explains how cells get what they need","Needs no energy (diffusion and osmosis)","Active transport lets cells collect scarce substances"],
 ["Mixing up osmosis and diffusion","Forgetting that osmosis involves only water and a membrane","Saying active transport goes down the gradient"],
 "Diffusion: high to low; osmosis: water across a membrane; active transport: needs energy.", EN_W);

eduAdd("cell_division","biology",["histology"],"Mitosis and meiosis",
 ["mitosis","meiosis","cell division","mitosis and meiosis","cell cycle","chromosomes in cell division","stages of mitosis","stages of meiosis"],
 "Cell division is how cells make new cells. Mitosis makes two identical cells for growth and repair; meiosis makes four different sex cells (gametes) with half the chromosomes.",
 "Mitosis is photocopying a cell; meiosis is shuffling and halving to make eggs and sperm.",
 ["Mitosis: one cell divides into two identical daughter cells with the same number of chromosomes (46 in humans).","Meiosis: one cell divides twice to give four cells with half the chromosomes (23 in humans).","Mitosis is used for growth, repair and asexual reproduction; meiosis for gametes.","Fertilisation joins two gametes and restores the full number of chromosomes."],
 "When you cut your skin, mitosis makes new skin cells to heal the wound.",
 "Growth, healing, genetics, cancer and reproduction.",
 ["Explains growth and repair","Meiosis creates variation between offspring","Keeps the chromosome number constant across generations"],
 ["Mixing up mitosis and meiosis outcomes","Forgetting that meiosis halves the chromosome number","Confusing chromosome number with the number of cells"],
 "Mitosis = 2 identical cells; meiosis = 4 different cells with half the chromosomes.", EN_W);

eduAdd("classification","biology",[],"Classification of living things",
 ["classification","classification of living things","taxonomy","kingdoms","five kingdoms","vertebrates and invertebrates","binomial nomenclature","species","vertebrates","invertebrates","classification of animals"],
 "Classification is the grouping of living things according to their similarities. Scientists group organisms into kingdoms, phyla, classes, orders, families, genera and species.",
 "It is like sorting a huge library into shelves, so that every book has its place.",
 ["Five kingdoms: animals, plants, fungi, protists and monera (bacteria).","Animals are divided into vertebrates (with a backbone) and invertebrates.","Vertebrate classes: fish, amphibians, reptiles, birds and mammals.","Binomial nomenclature gives each species a two-part Latin name, for example Homo sapiens."],
 "A dog and a wolf share the genus Canis, so they are closely related. A dog and a cat are only in the same class (mammals).",
 "Biology, medicine, conservation and agriculture.",
 ["Makes it easy to study millions of species","Shows how organisms are related","Gives scientists a common language"],
 ["Mixing up the levels of classification","Thinking all invertebrates are insects","Forgetting that species names are written in italics with a capital first letter for the genus"],
 "Classification groups living things by similarity, from kingdom down to species.", EN_W);

eduAdd("diseases_immunity","biology",[],"Diseases and immunity",
 ["diseases","disease","malaria","cholera","typhoid","tuberculosis","hiv and aids","immunity","vaccination","vaccines","pathogens","communicable diseases","infectious diseases","antibodies","germs","hygiene","immunisation"],
 "A disease is a condition that stops the body working properly. Communicable diseases are caused by pathogens (bacteria, viruses, fungi, protozoa) and can spread. Immunity is the body's ability to resist them.",
 "Pathogens are invaders; white blood cells and antibodies are the defence force; vaccines are the training drill.",
 ["Pathogens enter through air, water, food, contact or vectors such as mosquitoes.","Malaria is caused by a protozoan (Plasmodium) spread by the female Anopheles mosquito; cholera and typhoid spread through dirty water.","White blood cells and antibodies destroy pathogens; after infection or vaccination the body remembers them.","Prevention: clean water, good hygiene, vaccination, mosquito nets and proper waste disposal."],
 "A child vaccinated against measles produces antibodies without having the disease, so the body can fight it quickly if exposed later.",
 "Public health, hospitals, school health education and community work.",
 ["Understanding disease helps prevent it","Vaccines protect individuals and communities","Good hygiene saves lives"],
 ["Thinking antibiotics work against viruses (they do not)","Mixing up the cause (pathogen) and the vector (mosquito)","Forgetting that vaccines prevent, not cure"],
 "Pathogens cause communicable diseases; immunity and vaccines protect us.", EN_W);

eduAdd("human_reproduction","biology",[],"Human reproduction",
 ["human reproduction","reproduction in humans","fertilisation","pregnancy","reproductive system","menstrual cycle","puberty","gametes","embryo","foetus","fetus"],
 "Human reproduction is the process by which humans produce offspring. It involves the male and female reproductive systems and the joining of sperm and egg.",
 "Two tiny cells, one from each parent, join and grow into a new person.",
 ["The male gametes are sperm made in the testes; the female gametes are eggs made in the ovaries.","Fertilisation happens when a sperm joins an egg, usually in the oviduct, forming a zygote.","The embryo implants in the uterus and develops into a foetus, nourished through the placenta.","Birth occurs after about 9 months; puberty is the stage when the body becomes able to reproduce."],
 "After fertilisation the zygote divides by mitosis, forming a ball of cells that attaches to the wall of the uterus.",
 "Health education, family planning and medicine.",
 ["Explains how life begins and develops","Supports health education","Helps people make informed decisions about health"],
 ["Mixing up gametes and zygote","Forgetting that fertilisation happens in the oviduct","Confusing embryo and foetus"],
 "Fertilisation joins sperm and egg; the embryo grows in the uterus.", EN_W);

eduAdd("plant_reproduction","biology",[],"Reproduction in plants",
 ["pollination","seed dispersal","germination","reproduction in plants","flower structure","parts of a flower","fruit and seed formation","asexual reproduction in plants","vegetative propagation","self pollination","cross pollination"],
 "Flowering plants reproduce sexually by seeds. Pollination transfers pollen to the stigma, fertilisation forms seeds, and the seeds are dispersed and germinate.",
 "The flower is the plant's reproductive organ, and the seed is a baby plant with a packed lunch.",
 ["Flower parts: sepals, petals, stamens (male: anther and filament) and carpel (female: stigma, style, ovary).","Pollination: pollen moves from an anther to a stigma by wind, insects or other animals.","Fertilisation: the pollen nucleus joins an ovule, the ovule becomes a seed and the ovary becomes a fruit.","Seeds are dispersed (wind, water, animals, explosion) and germinate with water, warmth and oxygen."],
 "Bees visiting a flower for nectar carry pollen on their bodies to the next flower: this is insect pollination.",
 "Farming, fruit and seed production, gardening and conservation.",
 ["Explains fruits and seeds","Helps farmers improve crops","Shows how plants spread"],
 ["Mixing up pollination and fertilisation","Forgetting that the ovary becomes the fruit","Confusing sexual and asexual reproduction"],
 "Pollination → fertilisation → seed and fruit → dispersal → germination.", EN_W);

eduAdd("plant_transport","biology",[],"Transport in plants",
 ["transpiration","transport in plants","xylem and phloem","water uptake in plants","translocation","xylem","phloem","stomata","root hair cells","water movement in plants","how plants lose water","water loss in plants","loss of water from leaves"],
 "Plants transport water and minerals up from the roots through the xylem, and sugars made in the leaves through the phloem.",
 "The xylem is a set of water pipes going up; the phloem is a delivery system for food in both directions.",
 ["Root hair cells absorb water by osmosis and minerals by active transport.","Xylem vessels carry water and minerals up to the leaves.","Transpiration is the loss of water vapour from the leaves through the stomata; it pulls water up the plant.","Phloem carries sugars from the leaves to growing parts and storage organs (translocation)."],
 "On a hot, dry, windy day a plant loses water faster, so its transpiration rate increases.",
 "Farming, irrigation and understanding plant health.",
 ["Explains how water reaches the top of tall trees","Helps farmers manage water","Shows how food is distributed in plants"],
 ["Mixing up xylem and phloem","Forgetting that transpiration pulls water up","Thinking water moves only by osmosis"],
 "Xylem: water up; phloem: sugars around; transpiration pulls water.", EN_W);

/* ══════════════ MORE SECONDARY CHEMISTRY ══════════════ */
eduAdd("states_of_matter","chemistry",["physics"],"States of matter and kinetic theory",
 ["states of matter","kinetic theory","solids liquids and gases","melting and boiling","changes of state","particle theory","evaporation and condensation","sublimation","kinetic theory of matter","melting point","boiling point","freezing"],
 "Matter exists as solid, liquid or gas. The kinetic theory explains these states by the arrangement and movement of the tiny particles.",
 "Picture the particles as people: tightly packed in a solid, sliding past each other in a liquid, and running around freely in a gas.",
 ["Solid: particles are close together in fixed positions and only vibrate; fixed shape and volume.","Liquid: particles are close but can move around; fixed volume, no fixed shape.","Gas: particles are far apart and move quickly; no fixed shape or volume.","Heating gives particles more energy, causing melting, boiling or evaporation; cooling causes freezing and condensation."],
 "When ice melts, heat makes the particles vibrate more until they break out of their fixed positions and flow as water.",
 "Cooking, weather, refrigeration and industry.",
 ["Explains why substances behave differently","Explains melting, boiling and diffusion","Basis of many chemistry and physics ideas"],
 ["Thinking particles in a solid do not move at all","Mixing up evaporation and boiling","Confusing melting and dissolving"],
 "Solids, liquids and gases differ in how their particles are arranged and move.", EN_W);

eduAdd("separation_techniques","chemistry",[],"Separation techniques",
 ["separation techniques","separating mixtures","filtration","distillation","fractional distillation","chromatography","crystallisation","decantation","mixtures","solutions and mixtures","pure and impure substances","evaporation to dryness","solute and solvent","separating funnel","sieving"],
 "A mixture contains two or more substances that are not chemically joined and can be separated by physical methods. The method used depends on the properties of the substances.",
 "Choose the method that exploits a difference, such as size, boiling point or solubility.",
 ["Filtration separates an insoluble solid from a liquid (sand from water).","Evaporation or crystallisation recovers a dissolved solid (salt from salt solution).","Simple distillation separates a solvent from a solution; fractional distillation separates liquids with different boiling points (crude oil, ethanol and water).","Chromatography separates dissolved substances (such as inks and dyes) by how far they travel on paper."],
 "To get pure water from salt water, use distillation: the water boils off, condenses in the condenser and is collected, leaving the salt behind.",
 "Water purification, oil refining, food industry and forensic science.",
 ["Gives pure substances for use","Basis of the oil and chemical industries","Helps in testing and analysis"],
 ["Mixing up the methods","Forgetting that filtration separates only insoluble solids","Confusing a mixture with a compound"],
 "Mixtures are separated by physical methods that use differences in properties.", EN_W);

eduAdd("electrolysis","chemistry",["physics"],"Electrolysis",
 ["electrolysis","electrolyte","electroplating","electrodes","anode and cathode","electrolysis of brine","anode","cathode","electrolysis of water","extraction by electrolysis"],
 "Electrolysis is the breaking down of an ionic compound, when molten or dissolved, using an electric current.",
 "Electricity is used as a pushing force to split a compound into its elements.",
 ["The electrolyte is the molten or dissolved ionic compound that conducts electricity.","Cations (positive ions) move to the cathode (negative electrode) and gain electrons (reduction).","Anions (negative ions) move to the anode (positive electrode) and lose electrons (oxidation).","Uses: extracting reactive metals (aluminium), electroplating, purifying copper and making chlorine and sodium hydroxide."],
 "In the electrolysis of molten lead(II) bromide, lead forms at the cathode and bromine at the anode.",
 "Metal extraction, electroplating, and making chemicals.",
 ["Extracts reactive metals that cannot be obtained with carbon","Coats objects with a protective layer of metal","Produces important chemicals"],
 ["Mixing up the anode and cathode","Forgetting that the ions must be free to move (molten or dissolved)","Confusing oxidation and reduction"],
 "Electrolysis uses electricity to decompose an ionic compound.", EN_W);

eduAdd("rates_reaction","chemistry",[],"Rates of reaction",
 ["rate of reaction","rates of reaction","collision theory","factors affecting rate of reaction","speed of reaction","reaction rate","surface area and reaction rate","concentration and rate","temperature and rate"],
 "The rate of reaction is how fast reactants are used up or products are formed. According to collision theory, reactions happen when particles collide with enough energy.",
 "More frequent and more energetic collisions mean a faster reaction.",
 ["Increasing temperature gives particles more energy, so more collisions are successful.","Increasing concentration (or pressure for gases) means more collisions each second.","Increasing surface area (powder instead of lumps) exposes more particles.","A catalyst speeds a reaction without being used up."],
 "Marble powder reacts with acid faster than marble lumps because the powder has a larger surface area.",
 "Industry, cooking, food storage and medicine.",
 ["Helps control the speed of useful reactions","Explains why food spoils faster in heat","Basis for industrial processes"],
 ["Mixing up the rate with the amount of product","Forgetting that a larger surface area means faster reaction","Thinking a catalyst is used up"],
 "Faster reaction = more frequent, more energetic collisions.", EN_W);

eduAdd("redox","chemistry",["biochemistry"],"Oxidation and reduction (redox)",
 ["redox","oxidation and reduction","oxidation","reduction","oxidising agent","reducing agent","oxidation number","rusting and corrosion","rusting","corrosion","oil rig"],
 "Oxidation and reduction are chemical processes in which electrons are transferred. Oxidation is loss of electrons; reduction is gain of electrons (remember OIL RIG).",
 "OIL RIG: Oxidation Is Loss, Reduction Is Gain, of electrons.",
 ["Oxidation: gain of oxygen, loss of hydrogen or loss of electrons.","Reduction: loss of oxygen, gain of hydrogen or gain of electrons.","The oxidising agent gets reduced; the reducing agent gets oxidised.","Rusting is the oxidation of iron in the presence of water and oxygen."],
 "In 2Mg + O₂ → 2MgO, magnesium loses electrons (it is oxidised) and oxygen gains electrons (it is reduced).",
 "Rusting, batteries, metal extraction and respiration.",
 ["Explains many everyday processes","Basis of batteries and electrolysis","Helps prevent rusting"],
 ["Mixing up oxidation and reduction","Forgetting that they happen together","Thinking oxidation always involves oxygen"],
 "OIL RIG: Oxidation Is Loss and Reduction Is Gain of electrons.", EN_W);

eduAdd("energy_changes","chemistry",["physics"],"Exothermic and endothermic reactions",
 ["exothermic and endothermic","exothermic","endothermic","energy changes in reactions","heat of reaction","enthalpy","energy profile","bond breaking and bond making","enthalpy change"],
 "In an exothermic reaction heat is given out to the surroundings, so the temperature rises. In an endothermic reaction heat is taken in, so the temperature falls.",
 "Exothermic means 'exits as heat'; endothermic means 'enters as heat'.",
 ["Exothermic: combustion, respiration and neutralisation give out heat.","Endothermic: photosynthesis and dissolving ammonium nitrate take in heat.","Breaking bonds takes in energy; making bonds gives out energy.","If more energy is released making bonds than is used breaking bonds, the reaction is exothermic."],
 "When methane burns, heat is released into the surroundings, so combustion is exothermic. A cold pack that feels cold is an endothermic process.",
 "Fuels, hand warmers, cold packs and cooking.",
 ["Explains where energy comes from in reactions","Helps choose fuels","Explains heating and cooling effects"],
 ["Mixing up exothermic and endothermic","Forgetting that bond breaking needs energy","Thinking 'endothermic' means the reaction gives out heat"],
 "Exothermic releases heat; endothermic absorbs heat.", EN_W);

eduAdd("reactivity_series","chemistry",[],"Reactivity series and metals",
 ["reactivity series","reactivity of metals","metals and non metals","displacement reaction","extraction of metals","properties of metals","alloys","metal extraction","uses of metals","reactivity of metals with water"],
 "The reactivity series ranks metals from most to least reactive. A more reactive metal can displace a less reactive metal from its compound.",
 "A strong metal pushes a weaker one out of its compound.",
 ["Order (most to least reactive): potassium, sodium, calcium, magnesium, aluminium, zinc, iron, lead, copper, silver, gold.","More reactive metals react more vigorously with water and acids.","Displacement: a more reactive metal replaces a less reactive one from its salt solution.","Very reactive metals are extracted by electrolysis; less reactive ones, such as iron, by heating with carbon."],
 "If an iron nail is placed in copper sulfate solution, iron displaces copper: Fe + CuSO₄ → FeSO₄ + Cu, and the nail becomes coated with copper.",
 "Extracting metals, preventing rust, batteries and recycling.",
 ["Predicts which reactions will happen","Explains how metals are extracted","Guides the choice of metals for jobs"],
 ["Mixing up the order of the series","Thinking a less reactive metal can displace a more reactive one","Forgetting that very reactive metals need electrolysis for extraction"],
 "Reactivity series: a more reactive metal displaces a less reactive one.", EN_W);

eduAdd("water_hardness","chemistry",["biology","geography"],"Hard water and water treatment",
 ["hard water","soft water","water treatment","water pollution","hardness of water","purification of water","temporary hardness","permanent hardness","water purification","scale in kettles"],
 "Hard water contains dissolved calcium and magnesium salts, which make it difficult for soap to form lather. Soft water lathers easily.",
 "Soap becomes a scum in hard water instead of a lather.",
 ["Temporary hardness is caused by calcium or magnesium hydrogencarbonate and is removed by boiling.","Permanent hardness is caused by calcium or magnesium sulfate or chloride and is not removed by boiling.","Both can be softened by adding sodium carbonate or by using ion-exchange resins.","Water treatment: screening, sedimentation, filtration and chlorination make water safe to drink."],
 "Boiling hard water in a kettle leaves a white scale of calcium carbonate: this is temporary hardness being removed.",
 "Laundry, drinking water, boilers and industry.",
 ["Understanding hardness helps in choosing treatment methods","Hard water provides calcium that is good for bones and teeth","Water treatment protects health"],
 ["Mixing up temporary and permanent hardness","Thinking boiling removes all hardness","Confusing hard water with dirty water"],
 "Hard water has calcium or magnesium salts; boiling removes only temporary hardness.", EN_W);

eduAdd("air_pollution","chemistry",["geography","biology"],"Air and air pollution",
 ["composition of air","air pollution","pollutants","acid rain","oxides of nitrogen","smog","air pollutants","carbon monoxide","sulfur dioxide","gases in the air","fractional distillation of air"],
 "Clean air is mostly nitrogen (about 78%) and oxygen (about 21%), with small amounts of argon, carbon dioxide and other gases. Air pollution is the presence of harmful substances in the air.",
 "A small amount of the wrong gas can harm the air everyone breathes.",
 ["Composition: about 78% nitrogen, 21% oxygen, 0.9% argon and about 0.04% carbon dioxide.","Carbon monoxide comes from incomplete combustion and is poisonous.","Sulfur dioxide and oxides of nitrogen cause acid rain.","Reduce pollution with cleaner fuels, catalytic converters, filters and less burning of fossil fuels."],
 "Burning coal releases sulfur dioxide, which dissolves in rain to form acid rain that damages buildings and kills fish.",
 "Health, environmental protection, transport and industry.",
 ["Helps us understand and reduce harmful emissions","Protects health and ecosystems","Supports cleaner technology"],
 ["Thinking air is mostly oxygen (it is mostly nitrogen)","Mixing up carbon monoxide and carbon dioxide","Confusing acid rain with global warming"],
 "Air is mostly nitrogen and oxygen; pollutants such as CO and SO₂ harm health and the environment.", EN_W);

/* ══════════════ MORE SECONDARY PHYSICS ══════════════ */
eduAdd("light","physics",[],"Light, reflection and refraction",
 ["light","reflection of light","refraction of light","reflection","refraction","mirrors","lenses","laws of reflection","total internal reflection","image formation","plane mirror","light rays","convex lens","concave lens","ray diagram"],
 "Light is a form of energy that travels in straight lines at about 300,000 km per second and lets us see. It can be reflected, refracted and dispersed.",
 "Light bounces off a mirror like a ball off a wall, and bends when it moves from air into water.",
 ["Reflection: light bounces off a surface. Laws: the angle of incidence equals the angle of reflection, and both rays and the normal lie in one plane.","A plane mirror forms an upright, same-size image that is as far behind the mirror as the object is in front, and it is laterally inverted.","Refraction: light bends when it passes from one material to another because its speed changes.","Lenses refract light: a convex lens converges rays and a concave lens spreads them."],
 "A straw in a glass of water looks bent at the surface because light is refracted as it leaves the water.",
 "Mirrors, glasses, cameras, microscopes and optical fibres.",
 ["Explains how we see and how optical devices work","Basis of spectacles, cameras and telescopes","Explains rainbows and mirages"],
 ["Mixing up reflection and refraction","Forgetting to measure angles from the normal","Thinking the image in a plane mirror is real"],
 "Light reflects (angle in = angle out) and refracts (bends at boundaries).",
 Object.assign({not: ["photosynthesis","plant","plants","bulb","lamp","traffic","sun","sunlight"]}, EN_W));

eduAdd("sound","physics",[],"Sound",
 ["sound","speed of sound","echo","echoes","pitch and loudness","characteristics of sound","ultrasound","resonance","pitch","loudness","frequency of sound","sound travels","noise pollution"],
 "Sound is a form of energy made by vibrating objects. It travels as longitudinal waves and needs a material (solid, liquid or gas) to travel through.",
 "A guitar string vibrates, pushes the air, and the vibrations travel to your ear.",
 ["Sound is made by vibrations and cannot travel through a vacuum.","Pitch depends on frequency (higher frequency, higher pitch); loudness depends on amplitude.","Sound travels fastest in solids, slower in liquids and slowest in gases (about 340 m/s in air).","An echo is a reflected sound; ultrasound (above 20,000 Hz) is used in medical scans and sonar."],
 "If you hear an echo 2 seconds after shouting at a cliff, the sound travelled there and back, so the cliff is about 340 × 2 ÷ 2 = 340 m away.",
 "Music, communication, medicine, sonar and building design.",
 ["Explains hearing and music","Ultrasound allows safe medical imaging","Echo methods measure distances"],
 ["Mixing up pitch and loudness","Thinking sound travels in a vacuum","Forgetting that an echo's total distance is double the distance to the wall"],
 "Sound is a vibration travelling as a longitudinal wave through matter.", EN_W);

eduAdd("heat_transfer","physics",["chemistry"],"Heat transfer and expansion",
 ["heat transfer","conduction","convection","thermal radiation","thermal expansion","temperature and heat","specific heat capacity","latent heat","heat and temperature","thermometer","conductors and insulators","heat energy"],
 "Heat is energy that flows from a hotter object to a colder one. It travels by conduction, convection and radiation.",
 "Metal spoon in hot soup (conduction), hot air rising over a fire (convection), warmth from the Sun (radiation).",
 ["Conduction: heat passes through solids as particles vibrate and pass energy on; metals are good conductors.","Convection: hot fluids rise and cooler fluids sink, making a current in liquids and gases.","Radiation: heat travels as infrared waves and needs no material; dark, dull surfaces absorb and emit best.","Most materials expand when heated; heat energy Q = mcΔT for a temperature change."],
 "To heat 2 kg of water by 10 °C, with specific heat capacity 4,200 J/kg°C: Q = 2 × 4,200 × 10 = 84,000 J.",
 "Cooking, house design, thermos flasks, engines and weather.",
 ["Explains why metals feel cold and wool feels warm","Helps design insulation and heating systems","Explains winds and ocean currents"],
 ["Mixing up heat and temperature","Forgetting that radiation needs no material","Thinking cold flows into an object (heat flows out)"],
 "Heat flows by conduction, convection and radiation.", EN_W);

eduAdd("magnetism","physics",[],"Magnetism and electromagnetism",
 ["magnetism","magnets","magnetic field","electromagnet","electromagnetism","electromagnetic induction","transformer","motor effect","generator","magnetic materials","poles of a magnet","magnetic field lines","electric motor"],
 "A magnet attracts magnetic materials such as iron, nickel and cobalt. Electric currents also create magnetic fields, which is the basis of electromagnets, motors and generators.",
 "A current-carrying wire behaves like a magnet, and moving a magnet near a wire makes a current.",
 ["A magnet has a north and a south pole; like poles repel and unlike poles attract.","A magnetic field is the region around a magnet where it exerts a force; field lines run from north to south.","An electromagnet is a coil of wire carrying current, often around an iron core; its strength increases with more turns, more current or an iron core.","Electromagnetic induction: moving a wire in a magnetic field induces a voltage. Generators use this; transformers change voltage."],
 "A crane in a scrapyard uses a strong electromagnet, which can be switched on to lift scrap iron and off to drop it.",
 "Motors, generators, transformers, speakers and electric bells.",
 ["Explains electric motors and generators","Electromagnets can be switched on and off","Explains how electricity is generated and distributed"],
 ["Mixing up the attraction of like and unlike poles","Forgetting that an electromagnet needs a current","Mixing up a motor and a generator"],
 "Currents create magnetic fields; moving magnets can create currents.", EN_W);

eduAdd("radioactivity","physics",["chemistry"],"Radioactivity",
 ["radioactivity","radioactive decay","half life","half-life","alpha beta gamma","nuclear radiation","nuclear fission","nuclear fusion","isotopes","alpha particles","beta particles","radioactive","nuclear energy"],
 "Radioactivity is the spontaneous breakdown of unstable atomic nuclei, giving out radiation. The main types are alpha, beta and gamma radiation.",
 "An unstable nucleus is like an overfilled balloon that keeps releasing a little pressure.",
 ["Alpha particles are helium nuclei: heavily ionising but stopped by paper.","Beta particles are fast electrons: stopped by a few millimetres of aluminium.","Gamma rays are electromagnetic waves: very penetrating and reduced by thick lead or concrete.","Half-life is the time for half of the radioactive nuclei in a sample to decay."],
 "A sample with a half-life of 10 years and 80 g of radioactive material will have 40 g after 10 years and 20 g after 20 years.",
 "Medicine, dating of old objects, nuclear power, smoke detectors and safety.",
 ["Used in medicine to find and treat disease","Nuclear power gives large amounts of energy","Half-life dating helps date old objects"],
 ["Mixing up the three types of radiation","Thinking half-life means the substance disappears after two half-lives","Forgetting that radiation can be harmful"],
 "Radioactive decay: unstable nuclei emit alpha, beta or gamma; half-life measures the decay rate.", EN_W);

eduAdd("moments_machines","physics",["engineering"],"Moments, levers and simple machines",
 ["moments","moment of a force","principle of moments","levers","simple machines","pulleys","mechanical advantage","inclined plane","efficiency of machines","velocity ratio","centre of gravity","turning effect","equilibrium of forces"],
 "The moment of a force is its turning effect about a pivot. Simple machines such as levers, pulleys and inclined planes make work easier.",
 "A longer spanner makes it easier to turn a nut, because the same force has a bigger turning effect.",
 ["Moment = force × perpendicular distance from the pivot (N m).","Principle of moments: for an object in balance, clockwise moments = anticlockwise moments.","Mechanical advantage = load ÷ effort; velocity ratio = distance moved by effort ÷ distance moved by load.","Efficiency = (useful work output ÷ work input) × 100%."],
 "A see-saw is balanced when a 300 N child sits 2 m from the pivot and a 200 N child sits 3 m on the other side: 300 × 2 = 600 and 200 × 3 = 600.",
 "Spanners, crowbars, wheelbarrows, cranes and see-saws.",
 ["Makes lifting and turning easier","Explains balance and stability","Basis of engineering design"],
 ["Using the wrong distance (it must be perpendicular to the force)","Forgetting that a machine does not give more energy out than in","Mixing up mechanical advantage and efficiency"],
 "Moment = force × distance; balance when clockwise = anticlockwise moments.", EN_W);

eduAdd("work_power","physics",["engineering"],"Work, energy and power",
 ["work and power","work done","energy and power","units of power","watt","power in physics","work energy and power","efficiency","joule"],
 "Work is done when a force moves an object. Power is the rate of doing work, or how fast energy is transferred.",
 "Two people carry the same load up the stairs. The one who does it faster has more power.",
 ["Work done = force × distance moved in the direction of the force (joules).","Power = work done ÷ time (watts); 1 watt = 1 joule per second.","Energy transferred = work done.","Efficiency = useful energy output ÷ total energy input × 100%."],
 "A 50 N force moves a box 4 m: work = 50 × 4 = 200 J. If this takes 10 s, the power is 200 ÷ 10 = 20 W.",
 "Machines, engines, electrical appliances and exercise.",
 ["Measures how fast jobs are done","Helps compare machines and engines","Links force, energy and time"],
 ["Mixing up work and power","Forgetting that no work is done if the object does not move","Using the wrong unit (joules and watts)"],
 "Work = force × distance; power = work ÷ time.", EN_W);

eduAdd("electromagnetic_spectrum","physics",[],"Electromagnetic spectrum",
 ["electromagnetic spectrum","electromagnetic waves","radio waves","x rays","gamma rays","infrared","ultraviolet","microwaves","visible light spectrum","types of electromagnetic waves","dispersion of light"],
 "The electromagnetic spectrum is the family of waves that travel at the speed of light. They differ in wavelength and frequency.",
 "From long radio waves to short gamma rays, they are all the same kind of wave in different sizes.",
 ["Order, from long wavelength to short: radio waves, microwaves, infrared, visible light, ultraviolet, X-rays and gamma rays.","All travel at 300,000 km per second in a vacuum and carry energy.","Shorter wavelength means higher frequency and more energy.","Uses: radio and TV communication, microwave ovens, remote controls, medical X-rays and sterilising equipment."],
 "X-rays pass through soft tissue but are absorbed by bone, so they can show a broken bone on a photograph.",
 "Communication, medicine, cooking and security.",
 ["Explains many technologies","Shows how waves of different energies are used","Links light with other waves"],
 ["Mixing up the order of the spectrum","Thinking all waves are visible","Forgetting that high-energy waves like X-rays and gamma rays can be harmful"],
 "Electromagnetic spectrum: radio, micro, infrared, visible, ultraviolet, X-ray, gamma.", EN_W);


/* ══ CAREERS: shown when a student asks about careers or jobs linked to a subject ══ */
const BAINT_CAREERS = {
  math: ["Engineering (civil, electrical, mechanical)","Accounting, banking and finance","Data science and statistics","Actuarial science and insurance","Software development and AI","Teaching and research"],
  physics: ["Engineering (electrical, mechanical, petroleum)","Telecommunications and electronics","Energy and renewable power","Medical physics (X-ray and scanning equipment)","Aviation and aerospace","Teaching and research"],
  chemistry: ["Chemical and petroleum engineering","Pharmacy and drug manufacturing","Food and drink quality control","Environmental science","Forensic science","Materials, cosmetics and paint industries"],
  biology: ["Medicine and nursing","Pharmacy and medical laboratory science","Agriculture and veterinary medicine","Biotechnology and genetics","Environmental and conservation work","Public health"],
  biochemistry: ["Clinical biochemistry and medical laboratory science","Pharmaceutical research","Biotechnology and genetic testing","Food science and nutrition","Forensic science","Teaching and research"],
  histology: ["Histotechnology in hospital laboratories","Support work in pathology and cancer diagnosis","Biomedical research","Medicine and dentistry (as a foundation)"],
  computer: ["Software and mobile app development","Data analysis and AI","Cybersecurity","Networking and IT support","Web and game design","Database administration"],
  engineering: ["Civil, electrical, mechanical and chemical engineering","Construction and project management","Manufacturing and maintenance","Oil, gas and energy industries","Technical drawing and design","Teaching and research"],
  english: ["Law","Journalism, broadcasting and media","Teaching and lecturing","Writing, editing and publishing","Public relations and communications","Diplomacy and international organisations"],
  history: ["Teaching and research","Law and public service","Museum, archive and heritage work","Journalism","Diplomacy and politics","Tourism and culture"],
  economics: ["Banking and finance","Accounting and auditing (with further study)","Economic planning and policy analysis","Business and entrepreneurship","Insurance and investment analysis","Teaching and research"],
  government: ["Civil and public service","Law and politics","Diplomacy and international relations","Journalism and political analysis","Non-profit and development work","Teaching and research"],
  geography: ["Urban and regional planning","Surveying and mapping (GIS)","Meteorology and climate science","Environmental management","Tourism and travel","Teaching and research"]
};
const BAINT_SUBJECT_NAMES = {math:"Mathematics",physics:"Physics",chemistry:"Chemistry",biology:"Biology",biochemistry:"Biochemistry",histology:"Histology",computer:"Computer Science",engineering:"Engineering",english:"English",history:"History",economics:"Economics",government:"Government",geography:"Geography"};

/* ══ SUBJECT REGISTRY: any subject listed here is added to the dropdown (after English) if the page does not have it yet ══ */
const BAINT_SUBJECTS = [["english", "English Language and Literature"], ["economics", "Economics"], ["government", "Government and Civic Education"], ["geography", "Geography"]];
document.addEventListener("DOMContentLoaded", function(){
  try{
    var sel = document.getElementById("subject");
    if(sel){
      var last = sel.querySelector('option[value="math"]');
      BAINT_SUBJECTS.forEach(function(pair){
        var ex = sel.querySelector('option[value="' + pair[0] + '"]');
        if(ex){ last = ex; return; }
        var o = document.createElement("option"); o.value = pair[0]; o.textContent = pair[1];
        sel.insertBefore(o, last ? last.nextSibling : null);
        last = o;
      });
    }
    if(typeof data !== "undefined" && data.en){
      BAINT_SUBJECTS.forEach(function(pair){ if(!data.en[pair[0]]) data.en[pair[0]] = {topic: pair[1]}; });
    }
  }catch(e){}
});
