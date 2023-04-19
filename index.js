const axios = require("axios");
// const fs = require("fs");
// const Json2csvParser = require("json2csv").Parser;
const csv = require('csvtojson');
const ObjectsToCsv = require('objects-to-csv');

let strQuery = "\n    query PropertyDetailsFull(\n      $slug: String\n      $dateFiveYearsAgo: Date\n      $dateOneYearAhead: Date\n      $dateThreeYearsAhead: Date\n    ) {\n      propertyLookup(id: { slug: $slug }) {\n        address {\n          slug\n          fullAddress\n          hcAddressId\n          streetAddress\n          unit\n          city\n          state\n          zipcode\n          zipcodePlus4\n        }\n        association {\n          name\n          fees {\n            amount\n            frequency\n            notes\n          }\n        }\n        avm(qualityMethod: CONSUMER) {\n          priceUpper\n          priceLower\n          fsd\n          quality\n          priceMean\n        }\n        bestPhotos(orderBy: MLS) {\n          id\n          storageUrl\n          prediction\n          confidence\n          representation {\n            httpUrl\n            height\n            width\n          }\n        }\n        block {\n          valueTs(start: $dateFiveYearsAgo, end: $dateOneYearAhead) {\n            adjustedValue\n            month\n          }\n          crime {\n            all {\n              nationPercentile\n              countyPercentile\n            }\n            property {\n              nationPercentile\n              countyPercentile\n            }\n            violent {\n              nationPercentile\n              countyPercentile\n            }\n          }\n          valueTsForecastSummary {\n            year\n            value\n            percent\n          }\n          histograms {\n            age(rebin: { bins: 5, method: TAILS }) {\n              count\n              end\n              start\n            }\n            baths(rebin: { bins: 5, method: TAILS }) {\n              count\n              end\n              start\n            }\n            beds(rebin: { bins: 5, method: TAILS }) {\n              count\n              end\n              start\n            }\n            buildingArea(rebin: { bins: 5, method: TAILS }) {\n              count\n              end\n              start\n            }\n            valuePerSqft(rebin: { bins: 5, method: TAILS }) {\n              count\n              end\n              start\n            }\n          }\n        }\n        hcBuildingId\n        comps(limit: 6, minScore: 85, includeActive: false) {\n          avm {\n            priceMean\n          }\n          address {\n            slug\n            fullAddress\n            hcAddressId\n            streetAddress\n            unit\n            city\n            state\n            zipcode\n            zipcodePlus4\n          }\n          bestPhotos(limit: 1, orderBy: MLS) {\n            id\n            storageUrl\n            prediction\n            confidence\n            representation {\n              httpUrl\n              height\n              width\n            }\n          }\n          geoLocation {\n            latitude\n            longitude\n          }\n          listPrice\n          livingSpace {\n            livingArea\n            bedrooms {\n              count\n            }\n            bathrooms {\n              summaryCount\n            }\n          }\n          mls {\n            regulations {\n              logoOverlay\n              photosLogoOverlay\n            }\n          }\n          propertyType\n          summary {\n            mlsState\n            listPrice\n            hcBuildingId\n            score {\n              default {\n                dollars\n                level\n                similarity\n              }\n            }\n          }\n        }\n        county {\n          name\n        }\n        geoLocation {\n          latitude\n          longitude\n        }\n        latestAssessment {\n          taxSummary {\n            amount\n            year\n          }\n        }\n        latestListing {\n          agentName\n          agentEmail\n          agentPhone\n          agentLicense\n          listingOfficeName\n          buyerBrokerageCompensationDisplay\n          openHouse(status: ACTIVE) {\n            appointmentRequired\n            date\n            description\n            directions\n            end\n            remarks\n            start\n          }\n          publicRemarks\n          status\n          statusDate\n          price\n          listingID\n        }\n        listDate\n        listPrice\n        livingSpace {\n          numberOfRooms\n          livingArea\n          bedrooms {\n            count\n          }\n          bathrooms {\n            summaryCount\n          }\n        }\n        mls {\n          mlsID\n          name\n          abbreviation\n          lastRefreshed\n          regulations {\n            copyrightStatement\n            disclaimer\n            logo\n            logoOverlay\n            photosClosedLogin\n            photosLogoOverlay\n          }\n        }\n        mlsState\n        nearbyListings(limit: 10, minScore: 85) {\n          address {\n            slug\n            fullAddress\n            hcAddressId\n            streetAddress\n            unit\n            city\n            state\n            zipcode\n            zipcodePlus4\n          }\n          avm {\n            priceMean\n          }\n          bestPhotos(limit: 6, orderBy: MLS) {\n            id\n            storageUrl\n            prediction\n            confidence\n            representation(size: SMALL) {\n              httpUrl\n              height\n              width\n            }\n          }\n          geoLocation {\n            latitude\n            longitude\n          }\n          summary {\n            baths\n            beds\n            latitude\n            longitude\n            listDate\n            listPrice\n            mlsState\n            mlsStateDate\n            sqft\n            propertyType\n          }\n          mls {\n            abbreviation\n            lastRefreshed\n            mlsID\n            name\n            regulations {\n              logoOverlay\n              photosLogoOverlay\n            }\n          }\n        }\n        propertyType\n        parcel {\n          geometry\n        }\n        rentalAvm(qualityMethod: CONSUMER) {\n          priceMean\n          priceUpper\n          priceLower\n          fsd\n          quality\n        }\n        rentalYield\n        schools {\n          id\n          name\n          levels\n          distanceMiles\n          score\n        }\n        schoolsSummary\n        site {\n          area(units: SQFT)\n          areaDescription\n          zoning {\n            code\n          }\n        }\n        structure {\n          yearBuilt\n          stories\n        }\n        transfers(order: DESCENDING) {\n          transferDate\n          transferPrice\n          eventType\n        }\n        zip {\n          hpi(start: $dateFiveYearsAgo, end: $dateThreeYearsAhead) {\n            adjustedValue\n            month\n          }\n          hpiForecastSummary {\n            year\n            value\n            percent\n          }\n        }\n        floodZone {\n          effectiveDate\n          floodRisk\n          floodRiskDisplay\n          panelNumber\n          zone\n        }\n        paymentEstimate {\n          associationFee\n          pmi\n          loan\n          tax\n          total\n        }\n      }\n    }\n  ";

// const csvFields = ['Slug', 'Full Address', 'HC Address ID', 'Street Address', 'Unit', 'City', 'State', 'Zipcode', 'Zipcode Plus4', 'AVM Price Upper', 'AVM Price Lower', 'AVM FSD', 'AVM Quality', 'AVM Price Mean', 'Bedrooms Count', 'Bathrooms Sumary Count', 'RentalAVM PriceMean', 'RentalAVM Price Upper', 'RentalAVM Price Lower', 'RentalAVM FSD', 'RentalAVM Quality', 'Rental Yield', 'Tax Summary Amount', 'Tax Summary Year'];
// const json2csvParser = new Json2csvParser({
//     csvFields
// });

let strToken = '';
// let arrCSVResult = [];

main();

async function main() {
    const arrSlugs = await csv().fromFile('test.csv');
    // const arrSlugs = await csv().fromFile('our-zips.csv');
    console.log("File Imported Successfully!")

    let concurrency = 10;
    let runningEvents = 0;
    let finished = 0;

    const finishInterval = setInterval(() => {
        console.log("Finished: ", finished);
    }, 1000);

    let promises = [];

    let count = arrSlugs.length;
    for (let i = 0; i < count + 1; i++) {
        while (runningEvents > concurrency) {
            await new Promise((resolve) => setTimeout(resolve, 50));
        }

        runningEvents++;
        promises.push(
            getResponse(arrSlugs[i])
            .then((result) => {
                if (result != null) {
                    exportData(result);
                } else {
                    console.log("Slug Data is null!", arrSlugs[i]);
                }
                runningEvents--;
                finished++;
            })
            .catch((e) => console.log(e))
        );
    }

    console.log("finished1 ------------------");
    await Promise.all(promises);
    console.log("finished2 ------------------");
    clearInterval(finishInterval);

    // const csvData = json2csvParser.parse(arrCSVResult);
    // fs.writeFile("results.csv", csvData, function(error) {
    //     if (error) throw error;
    //     console.log("Write to results.csv successfully!");
    // });
}

async function getResponse(objSlug, bAuth = true) {
    try {

        let strSlug = objSlug.Address.split(" ").join('-') + '-' +
            objSlug.field2.split(" ").join('-') + '-' +
            objSlug.field3.split(" ").join('-') + '-' +
            objSlug.field4.split(" ").join('-');

        // console.log(strSlug);

        if (!bAuth || strToken == '') {
            let strTokenResponse = await axios.get("https://www.comehome.com/property-details/" + strSlug);
            strToken = strTokenResponse.data.split('status":"SUCCESS","token":"')[1].split('",')[0];
        }

        // console.log(strToken);
        let response = await axios.request("https://property-graph.comehome.com/graphql", {
            // httpsAgent: new HttpsProxyAgent(proxy_url),  /////// proxy
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9",
                "cache-control": "no-cache",
                "content-type": "application/json",
                "hc-api-auth": "Bearer " + strToken,
                "pragma": "no-cache",
                "sec-ch-ua": "\"Chromium\";v=\"112\", \"Google Chrome\";v=\"112\", \"Not:A-Brand\";v=\"99\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "x-graph-profile": "consumer",
                "Referer": "https://www.comehome.com/",
                "Referrer-Policy": "origin-when-cross-origin",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
            },
            "data": JSON.stringify({
                query: strQuery,
                variables: {
                    slug: strSlug
                }
            }),
            "method": "POST"
        });

        return response.data.data.propertyLookup;
    } catch (error) {

        console.log(error.message);
        if (error.response) {
            console.log(error.response.status);

            if (error.response.status == 401) {
                await getResponse(objSlug, false);
            }
        }

        return null;
    }
}

function exportData(data) {

    let objResult = {};
    objResult.data__propertyLookup__address__slug = data.address ? data.address.slug : null;
    objResult.data__propertyLookup__address__fullAddress = data.address ? data.address.fullAddress : null;
    objResult.data__propertyLookup__address__hcAddressId = data.address ? data.address.hcAddressId : null;
    objResult.data__propertyLookup__address__streetAddress = data.address ? data.address.streetAddress : null;
    objResult.data__propertyLookup__address__unit = data.address ? data.address.unit : null;
    objResult.data__propertyLookup__address__city = data.address ? data.address.city : null;
    objResult.data__propertyLookup__address__state = data.address ? data.address.state : null;
    objResult.data__propertyLookup__address__zipcode = data.address ? data.address.zipcode : null;
    objResult.data__propertyLookup__address__zipcodePlus4 = data.address ? data.address.zipcodePlus4 : null;

    objResult.data__propertyLookup__avm__priceUpper = data.avm ? data.avm.priceUpper : null;
    objResult.data__propertyLookup__avm__priceLower = data.avm ? data.avm.priceLower : null;
    objResult.data__propertyLookup__avm__fsd = data.avm ? data.avm.fsd : null;
    objResult.data__propertyLookup__avm__quality = data.avm ? data.avm.quality : null;
    objResult.data__propertyLookup__avm__priceMean = data.avm ? data.avm.priceMean : null;

    objResult.data__propertyLookup__livingSpace__bedrooms__count = data.livingSpace.bedrooms ? data.livingSpace.bedrooms.count : null;
    objResult.data__propertyLookup__livingSpace__bathrooms__summaryCount = data.livingSpace.bathrooms ? data.livingSpace.bathrooms.summaryCount : null;

    objResult.data__propertyLookup__rentalAvm__priceMean = data.rentalAvm ? data.rentalAvm.priceMean : null;
    objResult.data__propertyLookup__rentalAvm__priceUpper = data.rentalAvm ? data.rentalAvm.priceUpper : null;
    objResult.data__propertyLookup__rentalAvm__priceLower = data.rentalAvm ? data.rentalAvm.priceLower : null;
    objResult.data__propertyLookup__rentalAvm__fsd = data.rentalAvm ? data.rentalAvm.fsd : null;
    objResult.data__propertyLookup__rentalAvm__quality = data.rentalAvm ? data.rentalAvm.quality : null;

    objResult.data__propertyLookup__rentalYield = data.rentalYield;
    objResult.data__propertyLookup__latestAssessment__taxSummary__amount = data.latestAssessment ? data.latestAssessment.taxSummary.amount : null;
    objResult.data__propertyLookup__latestAssessment__taxSummary__year = data.latestAssessment ? data.latestAssessment.taxSummary.year : null;

    let temp = [];
    temp.push(objResult);
    new ObjectsToCsv(temp).toDisk('results.csv', { append: true });
    // arrCSVResult.push(objResult);
}