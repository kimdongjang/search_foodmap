const { Builder, By, Key, until } = require('selenium-webdriver');

(async function example() {
    let driver = await new Builder()
        .forBrowser('firefox')
        .build();
    try {
        // 카카오맵 실행
        await driver.get('https://map.kakao.com/');
        let userAgent = await driver.executeScript("return navigator.userAgent;")
        console.log('[UserAgent]', userAgent);

        // By.id로 #query Element를 얻어온다.
        let searchInput = await driver.findElement(By.id('search.keyword.query'));
        let keyword = "닭발";
        searchInput.sendKeys(keyword, Key.ENTER);

        // css selector로 가져온 element가 위치할때까지 최대 10초간 기다린다.
        await driver.wait(until.elementLocated(By.id('#info.search.place.list')), 10000);


        let resultElements = await driver.findElements(By.className('PlaceItem clickArea'));
        console.log('[resultElements.length]', resultElements.length)

    }
    finally {
        driver.quit();
    }
})();

//https://jizard.tistory.com/227