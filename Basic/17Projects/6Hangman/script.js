// https://codepen.io/cathydutton/pen/ldazc?editors=1010

window.onload = function() {
    
    let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z'];

    let categories;         // Array of topics
    let chosenCategory;     // Selected catagory
    let selWord;              // Selected word
    let guess;             // Geuss
    let guesses = [ ];      // Stored geusses
    let lives;             // Lives
    let counter;           // Count correct geusses
    let space;              // Number of spaces in word '-'

    let showLives = document.getElementById('lives');
    let showCat = document.getElementById('category');
    let getHint = document.getElementById('hint');
    let showClue = document.getElementById('clue');

    // Create alphabet ul
    let buttons = () => {
        myButtons = document.getElementById('buttons');
        letters = document.createElement('ul');

        for (let i=0; i<alphabet.length; i++) {
            letters.id = 'alphabet';
            list = document.createElement('li');
            list.id = 'letter';
            list.innerHTML = alphabet[i];
            check();

            myButtons.appendChild(letters);
            letters.appendChild(list);
        }
    }


    let selectCat = () => {
        if (chosenCategory === categories[0]) {
            category.innerHTML = 
            "The Chosen Category is Premier League Football Teams";
        }
        else if (chosenCategory === categories[1]) {
            category.innerHTML = "The Chosen Category Is Movies";
        }
        else if (chosenCategory === categories[2]) {
            category.innerHTML = "The Chosen Category Is Cities";
        }
    }

    let result  = () => {
        wordHolder = document.getElementById('blanks');
        correct = document.createElement('ul');

        for (let i=0; i<selWord.length; i++) {
            correct.setAttribute('id','word');
            guess = document.createElement('li');
            guess.setAttribute('class', 'guess');

            if (selWord[i] === "-") {
                guess.innerHTML = "-";
                space = 1;
            }
            else {
                guess.innerHTML = "_";
            }
            
            guesses.push(guess);
            wordHolder.appendChild(correct);
            correct.appendChild(guess);
        }
    }

    let comments =  () => {
        showLives.innerHTML = "You have " + lives + " lives";
        if (lives < 1) {
          showLives.innerHTML = "Game Over";
        }
        
        for (let i = 0; i < guesses.length; i++) {
          if (counter + space === guesses.length) {
            showLives.innerHTML = "You Win!";
          }
        }
    }

    let animate = () => {
        let drawMe = lives;
        //drawArray[drawMe]();

        try {
            drawArray[drawMe]();
        } catch (error) {
            console.log(error);
        }
    };

    let contextInit = () => {
        myStickman = document.getElementById("stickman");
        context = myStickman.getContext('2d');
        return context;
    }

    let canvas =  () => {

        context = contextInit();
        context.beginPath();
        context.strokeStyle = "#fff";
        context.lineWidth = 2;
    };

    let head = () => {
        let context = contextInit();
        context.beginPath();
        context.arc(60, 25, 10, 0, Math.PI*2, true);
        context.stroke();
    }

    let draw = ($pathFromx, $pathFromy, $pathTox, $pathToy) => {
    
        context.moveTo($pathFromx, $pathFromy);
        context.lineTo($pathTox, $pathToy);
        context.stroke(); 
    }

    let frame1 = () => {
        draw (0, 150, 150, 150);
    };
      
    let frame2 = () => {
        draw (10, 0, 10, 600);
    };
     
    let frame3 = () => {
        draw (0, 5, 70, 5);
    };
     
    let frame4 = () => {
        draw (60, 5, 60, 15);
    };
     
    let torso = () => {
        draw (60, 36, 60, 70);
      };
     
    let rightArm = () => {
        draw (60, 46, 100, 50);
    };
     
    let leftArm = () => {
        draw (60, 46, 20, 50);
    };
     
    let rightLeg = () => {
        draw (60, 70, 100, 100);
    };
     
    let leftLeg = () => {
        draw (60, 70, 20, 100);
    };    

    drawArray = [
        rightLeg, leftLeg, rightArm, 
        leftArm,  torso,  head, 
        frame4, frame3, frame2, frame1
    ];
    

    check = function () {
        list.onclick = function () {
            var guess = (this.innerHTML);
            this.setAttribute("class", "active");
            this.onclick = null;

            for (let i=0; i< selWord.length; i++) {
                if (selWord[i] === guess) {
                    guesses[i].innerHTML = guess;
                    counter++;
                }
            }

            let j = selWord.indexOf(guess);
            if (j === -1) {
                lives--;
                comments();
                animate();
            }
            else {
                comments();
            }
        } // )
    }
    
    let play = () => {
        categories = [
            ["everton", "liverpool", "swansea", "chelsea", "hull", "manchester-city", "newcastle-united"],
            ["alien", "dirty-harry", "gladiator", "finding-nemo", "jaws"],
            ["manchester", "milan", "madrid", "amsterdam", "prague"]
        ];

        chosenCategory = categories[Math.floor(Math.random() * categories.length)];
        selWord = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
        selWord = selWord.replace(/\s/g, "-");
        console.log(selWord);
        buttons();
        //console.log("00");

        guesses = [];
        lives = 10;
        counter = 0;
        space = 0;
        result();
        comments();
        //console.log("01");
        selectCat();
        canvas();
    }

    play();

    hint.addEventListener("click", () => {
        hints = [
            ["Based in Mersyside", "Based in Mersyside", "First Welsh team to reach the Premier Leauge", "Owned by A russian Billionaire", "Once managed by Phil Brown", "2013 FA Cup runners up", "Gazza's first club"],
            ["Science-Fiction horror film", "1971 American action film", "Historical drama", "Anamated Fish", "Giant great white shark"],
            ["Northern city in the UK", "Home of AC and Inter", "Spanish capital", "Netherlands capital", "Czech Republic capital"]
        ];

        let categoryIndex = categories.indexOf(chosenCategory);
        let hintIndex = chosenCategory.indexOf(selWord);
        showClue.innerHTML = "Clue: " + hints[categoryIndex][hintIndex];
    });


    let reset = document.getElementById("reset");
    // reset.addEventListener("click", restart());
    reset.addEventListener("click", () => {
        correct.parentNode.removeChild(correct);
        letters.parentNode.removeChild(letters);
        showClue.innerHTML = "";
        context.clearRect(0, 0, 400, 400);
        play();
    });
}