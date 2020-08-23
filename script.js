let happyTurtle =
    "https://cdn.glitch.com/acf75fd6-559f-44e0-8b37-99503c901125%2Fhappyturtle.png?v=1598116315295",
  sadTurtle =
    "https://cdn.glitch.com/acf75fd6-559f-44e0-8b37-99503c901125%2Fsadturtle.png?v=1598116323905",
  neutralTurtle =
    "https://cdn.glitch.com/acf75fd6-559f-44e0-8b37-99503c901125%2Fneutralturtle.png?v=1598112834741",
  happyPenguin =
    "https://cdn.glitch.com/acf75fd6-559f-44e0-8b37-99503c901125%2Fhappy.png?v=1598116500993",
  sadPenguin =
    "https://cdn.glitch.com/acf75fd6-559f-44e0-8b37-99503c901125%2Fsad.png?v=1598116509760",
  neutralPenguin =
    "https://cdn.glitch.com/acf75fd6-559f-44e0-8b37-99503c901125%2Fneutral.png?v=1598139860083",
  happyBird =
    "https://cdn.glitch.com/acf75fd6-559f-44e0-8b37-99503c901125%2Fhappybird.png?v=1598138827056",
  sadBird =
    "https://cdn.glitch.com/acf75fd6-559f-44e0-8b37-99503c901125%2Fsadbird.png?v=1598138833114",
  neutralBird =
    "https://cdn.glitch.com/acf75fd6-559f-44e0-8b37-99503c901125%2Fneutralbird.png?v=1598138830600";

//can change these based on our scoring system
const CAP1 = 10,
  CAP2 = 20,
  CAP3 = 30;

function setAnimal(animalString) {
  sessionStorage.setItem("animal", animalString);
  //let animal = animalString;
}

function getAnimal() {
  let animal = sessionStorage.getItem("animal");
  if (animal === "turtle") {
    document.getElementById("neutral-animal").src = neutralTurtle;
  } else if (animal === "bird") {
    document.getElementById("neutral-animal").src = neutralBird;
  }
}

function getHomeAnimal() {
  let mood = sessionStorage.getItem("mood");
  let animal = sessionStorage.getItem("animal");
  if (animal === "turtle") {
    document.getElementById("name").innerHTML = "hawksbill sea turtle";
    if (mood === "sad") {
      document.getElementById("home-animal").src = sadTurtle;
    } else if (mood === "happy") {
      document.getElementById("home-animal").src = happyTurtle;
    } else if (mood == "neutral") {
      document.getElementById("home-animal").src = neutralTurtle;
    }
  } else if (animal === "penguin") {
    document.getElementById("name").innerHTML = "galapagos penguin";
    if (mood === "sad") {
      document.getElementById("home-animal").src = sadPenguin;
    } else if (mood === "happy") {
      document.getElementById("home-animal").src = happyPenguin;
    } else if (mood == "neutral") {
      document.getElementById("home-animal").src = neutralPenguin;
    }
  } else if (animal === "bird") {
    document.getElementById("name").innerHTML = "great curassow bird";
    if (mood === "sad") {
      document.getElementById("home-animal").src = sadBird;
    } else if (mood === "happy") {
      document.getElementById("home-animal").src = happyBird;
    } else if (mood == "neutral") {
      document.getElementById("home-animal").src = neutralBird;
    }
  }
}

function setScore(score) {
  sessionStorage.setItem("score", score);
}

function getScore() {
  let hapScore = sessionStorage.getItem("score");
  let animal = sessionStorage.getItem("animal");
  let mood;
  if (hapScore < CAP1) {
    //sad animal
    if (animal === "turtle") {
      //set score-animal src to sad turtle
      document.getElementById("score-animal").src = sadTurtle;
    } else if (animal === "penguin") {
      document.getElementById("score-animal").src = sadPenguin;
    } else if (animal === "bird") {
      document.getElementById("score-animal").src = sadBird;
    }

    mood = "sad";
  } else if (hapScore < CAP2) {
    //neutral animal

    if (animal === "turtle") {
      //set score-animal src to neutral turtle
      document.getElementById("score-animal").src = neutralTurtle;
    } else if (animal === "penguin") {
      document.getElementById("score-animal").src = neutralPenguin;
    } else if (animal === "bird") {
      document.getElementById("score-animal").src = neutralBird;
    }

    mood = "neutral";
  } else {
    //happy animal

    if (animal === "turtle") {
      //set score-animal src to happy turtle
      document.getElementById("score-animal").src = happyTurtle;
    } else if (animal === "penguin") {
      document.getElementById("score-animal").src = happyPenguin;
    } else if (animal === "bird") {
      document.getElementById("score-animal").src = happyBird;
    }

    mood = "happy";
  }

  sessionStorage.setItem("mood", mood);
}

function getFacts() {
  let animal = sessionStorage.getItem("animal");
  if (animal === "turtle") {
    
    //does not change source link
    document
      .getElementById("source-text")
      .setAttribute(
        "href",
        "https://www.nationalgeographic.com/animals/reptiles/h/hawksbill-sea-turtle/"
      );

    document.getElementById("home-animal").src = neutralTurtle;
    document.getElementById("animal-name").innerHTML =
      "hawksbill sea turtle fun facts";
    document.getElementById("f1").innerHTML =
      "full-grown hawksbill sea turtles weight 100-150 pounds";
    document.getElementById("f2").innerHTML =
      "the shell of young hawksbill sea turtles are heart-shaped";
    document.getElementById("f3").innerHTML =
      "every few years, females return to the beaches where they were born to nest";
  } else if (animal === "penguin") {
    document.getElementById("home-animal").src = neutralPenguin;
    document.getElementById("animal-name").innerHTML =
      "galapagos penguin fun facts";
    document.getElementById("f1").innerHTML =
      "galapagos penguins stay with one partner for their entire lives";
    document.getElementById("f2").innerHTML =
      "galapagos penguins are the third smallest penguins in the world, weighing only about 5.5 pounds";
    document.getElementById("f3").innerHTML =
      "they become ready for independent life at only 3-6 months old";
  } else if (animal === "bird") {
    document.getElementById("home-animal").src = neutralBird;
    document.getElementById("animal-name").innerHTML =
      "great curassow bird fun facts";
    document.getElementById("f1").innerHTML = "great curassows can be up to 2 meters tall";
    document.getElementById("f2").innerHTML = "they mainly eat fruits and figs";
    document.getElementById("f3").innerHTML = "when they feel threatened, they are more likely to run away than fly away";
  }

}

function getTips() {
  //maybe select a random few out of array of tips
  let animal = sessionStorage.getItem("animal");
  
}
