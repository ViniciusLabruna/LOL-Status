var API_key = "RGAPI-6ff8a98b-5795-479e-a5fc-e868c606edbe";
var server_url = "";
var summoner_name = "";
var RegionName = "";
const Regions = [
    "br1.api.riotgames.com" ,
    "eun1.api.riotgames.com",
    "euw1.api.riotgames.com",
    "jp1.api.riotgames.com",
    "kr.api.riotgames.com",
    "la1.api.riotgames.com",
    "la2.api.riotgames.com",
    "na1.api.riotgames.com",
    "oc1.api.riotgames.com",
    "tr1.api.riotgames.com",
    "ru.api.riotgames.com",
]

function chooseRegion(){
    RegionNumber = document.getElementById("choose_region").value;
    server_url = Regions[RegionNumber];
}


function Search_summoner() {
    summoner_name = document.getElementById('summoner_name').value;
    console.log(summoner_name);
    chooseRegion();
    data();
}

async function data(){
    var summonerNameUrl = "/lol/summoner/v4/summoners/by-name/" + summoner_name;
    var fullSumonnerNameUrl = "https://" + server_url + summonerNameUrl + "?api_key=" + API_key; 
    console.log(fullSumonnerNameUrl);
    const dataSummoner_1 = await fetch(fullSumonnerNameUrl);
    const dataSummoner_Full = await dataSummoner_1.json();
    console.log(dataSummoner_Full);

    // Summoner's Name
    summoner_name = dataSummoner_Full.name;
    document.getElementById("summoner_name_data").innerHTML = "Summoner's name: " + summoner_name;

    // Summoner's level
    var summoner_Level = dataSummoner_Full.summonerLevel;
    console.log(summoner_Level);
    document.getElementById("summonerlevel_data").innerHTML = summoner_name + "'s level is " + summoner_Level;

    // Summoner's Profile Picture
    var profile_pic_number = dataSummoner_Full.profileIconId;
    var profile_pic_url ="http://ddragon.leagueoflegends.com/cdn/12.22.1/img/profileicon/" + profile_pic_number + ".png";
    document.getElementById("summonerprofilepic_picture").src = profile_pic_url;

    //Ranked
    var summoner_id = dataSummoner_Full.id;
    var summonernameUrl_2 = "/lol/league/v4/entries/by-summoner/";
    var ranked_summoner_url = "https://" + server_url + summonernameUrl_2 + summoner_id + "?api_key=" + API_key;
    const rankedSummoner1 = await fetch(ranked_summoner_url);
    const rankedSummoner_Full = await rankedSummoner1.json();
    const rankedSummoner_data = rankedSummoner_Full[0];
    var summoner_wins = rankedSummoner_data.wins;
    var summoner_losses = rankedSummoner_data.losses;
    console.log(rankedSummoner_data);

    //Ranked Win
    document.getElementById("ranked_win").innerHTML = "Wins: " + summoner_wins;

    //Ranked Lose
    document.getElementById("ranked_lose").innerHTML = "Losses: "+ summoner_losses;

    //Ranked Winratio
    var summoner_winratio = Math.round((summoner_wins / (summoner_losses + summoner_wins)) * 1000/10) ;
    document.getElementById("ranked_winratio").innerHTML = "Winratio: " + summoner_winratio + "%";

    //Ranked Division
    var division = rankedSummoner_data.tier + " " + rankedSummoner_data.rank;
    var lp_ranked = rankedSummoner_data.leaguePoints;
    document.getElementById("ranked_division").innerHTML = division + " " + lp_ranked + "LP";

    var division_tier =  rankedSummoner_data.tier;
    if(division_tier == "IRON "){
        document.getElementById("ranked_division").style.color = "gray"
    }
    else if(division_tier == "BRONZE"){
        document.getElementById("ranked_division").style.color = "brown"
    }
    else if(division_tier == "SILVER"){
        document.getElementById("ranked_division").style.color = "lightgray"
    }
    else if(division_tier == "GOLD"){
        document.getElementById("ranked_division").style.color = "yellow"
    }
    else if(division_tier == "PLATINUM"){
        document.getElementById("ranked_division").style.color = "lightblue"
    }
    else if(division_tier == "EMERALD"){
        document.getElementById("ranked_division").style.color = "green"
    }
    else if(division_tier == "DIAMOND"){
        document.getElementById("ranked_division").style.color = "blue"
    }
    else if(division_tier == "MASTER"){
        document.getElementById("ranked_division").style.color = "lightpurple"
    }
    else if(division_tier == "GRANDMASTER"){
        document.getElementById("ranked_division").style.color = "lightred"
    }
    else if(division_tier == "CHALLENGER"){
        document.getElementById("ranked_division").style.color = "gold"
    }
    

}

document.body.style.height = window.innerHeight + 'px'

