numeral.defaultFormat("($0.00a)");
numeral.zeroFormat("N/A");
numeral.nullFormat("N/A");
    

function parse() {
    var searchCounty = document.getElementById("getCounty").value;
    var searchYear = document.getElementById("getYear").value;
    var toYear = document.getElementById("toYear").value;

    if (searchYear >= toYear) 
        alert("Please correct the year selections.");


    parseData(
        'https://storage.googleapis.com/co-publicdata/grants.csv',
        calcTotals,
        searchCounty,
        searchYear,
        toYear
        );
}


function parseData(file, callBack, searchCounty, searchYear, toYear) {

    Papa.parse(file, {
    download: true,
    dynamicTyping: true,
    header: true,
    complete: function(results) {
      callBack(results.data, searchCounty, searchYear, toYear);
    }
  });
}




function calcTotals(data, searchCounty, searchYear, toYear) {

  var json = Papa.unparse(data);
  var sYr = searchYear.slice(-2);
  var tYr = toYear.slice(-2);
    
  var totalGrants = 0;
  var ctfGrants = 0;
  var fmlGrants = 0;
  var eiafGrants = 0;
  var sevGrants = 0;
  var vfpGrants = 0;
  var ffbGrants = 0;
  var cdbgGrants = 0;
  var csbgGrants = 0;
  var rediGrants = 0;
  var gamingGrants = 0;
  var mjGrants = 0;
  var sarGrants = 0;    
  var DR = 0;
  var MS = 0;
  var POMH = 0;
  var DCFA = 0;
  var CCPI = 0;
  var CHPG = 0;
  var CVRF = 0;
  var NEU = 0;
  var MSOB = 0;
  var SBR = 0;

    for (i = 0; i < data.length; i++) {
    if (data[i].dateofaward !== undefined){
    
    var doa = data[i].dateofaward.slice(-2);
    
    if (doa >= sYr && doa <= tYr) {  

        if (data[i].county.indexOf(searchCounty) >= 0) {
        totalGrants += data[i].award;

        if (data[i].program == "CTF") {
          ctfGrants += data[i].award;
        } else if (data[i].program == "FML" || data[i].program == "FML_SB106") {
          fmlGrants += data[i].award;
        } else if (data[i].program == "EIAF") {
          eiafGrants += data[i].award;
        } else if (data[i].program == "SEV/FML") {
          sevGrants += data[i].award;
        } else if (data[i].program == "VFP") {
          vfpGrants += data[i].award;
        } else if (data[i].program == "FCB") {
          ffbGrants += data[i].award;
        } else if (data[i].program == "CDBG" || data[i].program == "CDBGED" || data[i].program == "CDBGPF") {
          cdbgGrants += data[i].award;
        } else if (data[i].program == "CSBG") {
          csbgGrants += data[i].award;
        } else if (data[i].program == "REDI") {
          rediGrants += data[i].award;
        } else if (data[i].program == "GAME") {
          gamingGrants += data[i].award;
        } else if (data[i].program == "MJ" || data[i].program == "GBMJ") {
          mjGrants += data[i].award;
        } else if (data[i].program == "SAR" || data[i].program == "SAR EoY" || data[i].program == "SAR Tier 1" || data[i].program == "SAR Tier 2" || data[i].program == "SAR Tier 3") {
          sarGrants += data[i].award;
        } else if (data[i].program == "DR") {
          DR += data[i].award;
        } else if (data[i].program == "MS") {
          MS += data[i].award;
        } else if (data[i].program == "POMH") {
          POMH += data[i].award;
        } else if (data[i].program == "DCFA") {
          DCFA += data[i].award;
        } else if (data[i].program == "CCPI") {
          CCPI += data[i].award;
        } else if (data[i].program == "CHPG") {
          CHPG += data[i].award;
        } else if (data[i].program == "CVRF") {
          CVRF += data[i].award;
        } else if (data[i].program == "NEU") {
          NEU += data[i].award;
        } else if (data[i].program == "MSOB") {
          MSOB += data[i].award;
        } else if (data[i].program == "SBR") {
          SBR += data[i].award;
        } 
      }
    }
  }
    }

  document.getElementById("county").innerHTML = searchCounty + " County";
  document.getElementById("year").innerHTML = " from " + searchYear + " to Current Date";
  document.getElementById("totals").innerHTML = numeral(totalGrants).format();
  
    if(ctfGrants == 0){document.getElementById("ctfrow").style.display = "none";}
    else {document.getElementById("ctf").innerHTML = numeral(ctfGrants).format();
          document.getElementById("ctfrow").style.display = "table-row";}
  
    if(eiafGrants == 0){document.getElementById("eiafrow").style.display = "none";}
    else {document.getElementById("eiaf").innerHTML = numeral(eiafGrants).format();
          document.getElementById("eiafrow").style.display = "table-row";}
  
    if(sevGrants+fmlGrants == 0){document.getElementById("ddrow").style.display = "none";}
    else {document.getElementById("directdist").innerHTML = numeral(sevGrants+fmlGrants).format();
          document.getElementById("ddrow").style.display = "table-row";}

    if(vfpGrants == 0){document.getElementById("vfprow").style.display = "none";}
    else {document.getElementById("vfp").innerHTML = numeral(vfpGrants).format();
          document.getElementById("vfprow").style.display = "table-row";}

    if(ffbGrants == 0){document.getElementById("ffbrow").style.display = "none";}
    else {document.getElementById("ffb").innerHTML = numeral(ffbGrants).format();
          document.getElementById("ffbrow").style.display = "table-row";}

    if(cdbgGrants == 0){document.getElementById("cdbgrow").style.display = "none";}
    else {document.getElementById("cdbg").innerHTML = numeral(cdbgGrants).format();
          document.getElementById("cdbgrow").style.display = "table-row";}
  
    if(csbgGrants == 0){document.getElementById("csbgrow").style.display = "none";}
    else {document.getElementById("csbg").innerHTML = numeral(csbgGrants).format();
          document.getElementById("csbgrow").style.display = "table-row";}

    if(rediGrants == 0){document.getElementById("redirow").style.display = "none";}
    else {document.getElementById("redi").innerHTML = numeral(rediGrants).format();
          document.getElementById("redirow").style.display = "table-row";}

    if(gamingGrants == 0){document.getElementById("gamerow").style.display = "none";}
    else {document.getElementById("game").innerHTML = numeral(gamingGrants).format();
          document.getElementById("gamerow").style.display = "table-row";}

    if(mjGrants == 0){document.getElementById("mjrow").style.display = "none";}
    else {document.getElementById("mj").innerHTML = numeral(mjGrants).format();
          document.getElementById("mjrow").style.display = "table-row";}
  
    if(DR == 0){document.getElementById("drrow").style.display = "none";}
    else {document.getElementById("dr").innerHTML = numeral(DR).format();
          document.getElementById("drrow").style.display = "table-row";}

    if(MS == 0){document.getElementById("msrow").style.display = "none";}
    else {document.getElementById("ms").innerHTML = numeral(MS).format();
          document.getElementById("msrow").style.display = "table-row";}

    if(sarGrants == 0){document.getElementById("sarrow").style.display = "none";}
    else {document.getElementById("sar").innerHTML = numeral(sarGrants).format();
          document.getElementById("sarrow").style.display = "table-row";}

    if(POMH == 0){document.getElementById("pomhrow").style.display = "none";}
    else {document.getElementById("pomh").innerHTML = numeral(POMH).format();
          document.getElementById("pomhrow").style.display = "table-row";}

    if(DCFA == 0){document.getElementById("dcfarow").style.display = "none";}
    else {document.getElementById("dcfa").innerHTML = numeral(DCFA).format();
          document.getElementById("dcfarow").style.display = "table-row";}

    if(CCPI == 0){document.getElementById("ccpirow").style.display = "none";}
    else {document.getElementById("ccpi").innerHTML = numeral(CCPI).format();
          document.getElementById("ccpirow").style.display = "table-row";}

    if(CHPG == 0){document.getElementById("chpgrow").style.display = "none";}
    else {document.getElementById("chpg").innerHTML = numeral(CHPG).format();
          document.getElementById("chpgrow").style.display = "table-row";}
  
    if(CVRF == 0){document.getElementById("cvrfrow").style.display = "none";}
    else {document.getElementById("cvrf").innerHTML = numeral(CVRF).format();
         document.getElementById("cvrfrow").style.display = "table-row";}

    if(NEU == 0){document.getElementById("neurow").style.display = "none";}
    else {document.getElementById("neu").innerHTML = numeral(NEU).format();
        document.getElementById("neurow").style.display = "table-row";}

    if(MSOB == 0){document.getElementById("msobrow").style.display = "none";}
    else {document.getElementById("msob").innerHTML = numeral(MSOB).format();
          document.getElementById("msobrow").style.display = "table-row";}

    if(SBR == 0){document.getElementById("sbrrow").style.display = "none";}
    else {document.getElementById("sbr").innerHTML = numeral(SBR).format();
          document.getElementById("sbrrow").style.display = "table-row";}

  document.getElementById("datatable").style.display = "inline";

  
 zingchart.render({
    id: 'pieChart',
    data: 
    {
    type: "pie", 
    backgroundColor: "#FFF",
    plot: {
      borderColor: "#FFF",
      borderWidth: 2,
      valueBox: {
        placement: 'out',
        text: '%t\n%npv%',
        fontFamily: "Open Sans",
      fontSize: '12',
      rules: [
      {
      rule: '%v === 0',
      text: ''
    }
    ]
      },
      tooltip:{
        fontSize: '12',
        fontFamily: "Open Sans",
        padding: "5 10",
        text: "$%v (%npv%)",
      short: true,
      decimals: 2
      },
      animation:{
      effect: 5, 
      method: 5,
      speed: 200,
      sequence: 1
    }
    },
    plotarea: {
      margin: "20 0 0 0"  
    },
    series : [
        {
            values : [ctfGrants],
          text: "Conservation Trust Fund",
          backgroundColor: '#a6cee3',
        },
        {
          values: [eiafGrants],
          text: 'Energy Impact Assistance Fund',
          backgroundColor: '#1f78b4',
        },
        {
          values: [sevGrants + fmlGrants],
          text: 'Direct Distribution',
      backgroundColor: '#b2df8a'
        },
        {
          text: 'Volunteer Firefighter Pention Fund',
          values: [vfpGrants],
          backgroundColor: '#33a02c'
        },
        {
          text: 'Firefighter Cardiac Benefit',
          values: [ffbGrants],
          backgroundColor: '#fb9a99'
        },
        {
          text: 'Community Development Block Grant',
          values: [cdbgGrants],
          backgroundColor: '#ff7f00'
        },
        {
          text: 'Community Services Block Grant',
          values: [csbgGrants],
          backgroundColor: '#cab2d6'
        },
        {
          text: 'Limited Gaming Impact',
          values: [gamingGrants],
          backgroundColor: '#6a3d9a'
        },
        {
          text: 'Marijuana Impact',
          values: [mjGrants],
          backgroundColor: '#fee52f'
        },
        {
          text: 'Colorado Search and Rescue',
          values: [sarGrants],
          backgroundColor: '#581845'
        },
        {
          text: 'Disaster Recovery',
          values: [DR],
          backgroundColor: '#b15928'
        },
        {
          text: 'Main Street Program',
          values: [MS],
          backgroundColor: '#998307'
        },
        {
          text: 'Peace Officer Mental Health Support',
          values: [POMH],
          backgroundColor: '#1bf9f5'
        },
        {
          text: 'Defense Counsel on First Appearance',
          values: [DCFA],
          backgroundColor: '#900c3f'
        },
        {
          text: 'Community Crime Prevention Initiative',
          values: [CCPI],
          backgroundColor: '#ec33ec'
        },
        {
          text: 'Colorado Heritage Planning Grants',
          values: [CHPG],
          backgroundColor: '#daf7a6'
        },
        {
          text: 'Coronavirus Relief Funds',
          values: [CVRF],
          backgroundColor: '#2b3840'
        },
        {
          text: 'American Rescue Plan Act: NEU',
          values: [NEU],
          backgroundColor: '#7b03fc'
        },
        {
          text: 'Main Street: Open for Business',
          values: [MSOB],
          backgroundColor: '#fcba03'
        },
        {
          text: 'Small Business Relief Program',
          values: [SBR],
          backgroundColor: '#2596be'
        }
    ]
}
  });
  
  
  
}
