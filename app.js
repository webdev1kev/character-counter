const userTextInput = document.getElementById("user-text-input");
const totalCharsElement = document.getElementById("total-chars");
const wordCountElement = document.getElementById("word-count");
const sentenceCountElement = document.getElementById("sentence-count");

userTextInput.addEventListener("input", (e) => {
  const userInput = e.target.value;

  totalCharsElement.textContent = String(userInput.length).padStart(2, "0");
  wordCountElement.textContent = getWordCountString(userInput).padStart(2, "0");
  sentenceCountElement.textContent = getSentenceCountString(userInput).padStart(
    2,
    "0"
  );

  const letterDensities = calculateLetterDensities(userInput);
  const readTime = calculateReadTime(Number(getWordCountString(userInput)));

  renderLetterDensities(letterDensities);
  renderReadTime(readTime);
});

const getWordCountString = (input) => {
  const wordArray = input.split(" ").filter((word) => word !== "");
  return String(wordArray.length);
};

const getSentenceCountString = (input) => {
  let sentenceTotal = 0;

  sentenceTotal += input.split(".").length - 1;
  sentenceTotal += input.split("?").length - 1;
  sentenceTotal += input.split("!").length - 1;

  return String(sentenceTotal);
};

const calculateLetterDensities = (input) => {
  const cleanedString = input.replace(/[^a-zA-Z]/g, "");
  const characterString = cleanedString.toUpperCase();
  const characterArray = characterString.split("");
  const amountOfChars = characterString.length;
  const uniqueCharacters = new Set(characterString);

  const uniqueCharsArray = Array.from(uniqueCharacters);

  uniqueCharsArray.sort();

  const letterDensities = [];

  uniqueCharsArray.forEach((uniqueChar) => {
    const numOfMatches = characterArray.filter(
      (char) => char === uniqueChar
    ).length;
    const percentUsage = ((numOfMatches / amountOfChars) * 100).toFixed(2);

    const letterDensity = {
      letter: uniqueChar,
      count: numOfMatches,
      percentage: percentUsage,
    };

    letterDensities.push(letterDensity);
  });

  return letterDensities;
};

const calculateReadTime = (numOfWords) => {
  const readtime = parseFloat((numOfWords / 250).toPrecision(2));

  if (readtime == 0) {
    return "0";
  } else if (readtime < 1) {
    return "<1";
  }

  return String(Math.round(readtime));
};

const renderLetterDensities = (letterDensities) => {
  const densityStatsElement = document.querySelector(".density-stats");
  const emptyStatMessage = document.querySelector(".empty-stat-message");

  if (
    letterDensities.length > 0 &&
    !emptyStatMessage.classList.contains("hide")
  ) {
    emptyStatMessage.classList.add("hide");
  } else if (
    letterDensities.length <= 0 &&
    emptyStatMessage.classList.contains("hide")
  ) {
    emptyStatMessage.classList.remove("hide");
  }

  densityStatsElement.innerHTML = "";
  letterDensities.forEach((density) => {
    const { letter, percentage, count } = density;
    densityStatsElement.insertAdjacentHTML(
      "beforeend",
      `
        <div class="density-stat">
            <p class="density-letter text-4">${letter}</p>
              <div class="density-bar-container">
                <div class="density-bar" style="width: ${percentage}%;"></div>
              </div>
            <p class="density-text text-4">${count} (${percentage}%)</p>
        </div>

        `
    );
  });
};

const renderReadTime = (readtime) => {
  const readTimeElement = document.querySelector(".read-time");
  readTimeElement.innerText = readtime;
};
