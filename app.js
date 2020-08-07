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
    "https://storage.googleapis.com/co-publicdata/grants.csv",
    calcTotals,
    searchCounty,
    searchYear,
    toYear
  );
}


function parseData(url, callBack, searchCounty, searchYear, toYear) {
  Papa.parse(url, {
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

  for (i = 0; i < data.length; i++) {
    if (Date.parse(data[i].dateofaward) >= Date.parse(searchYear) && Date.parse(data[i].dateofaward) <= Date.parse(toYear)) {
      if (data[i].county.indexOf(searchCounty) >= 0) {
        totalGrants += data[i].award;

        if (data[i].program == "CTF") {
          ctfGrants += data[i].award;
        } else if (data[i].program == "FML" || data[i].program == "FML_SB106") {
          fmlGrants += data[i].award;
        } else if (data[i].program == "EIAF") {
          eiafGrants += data[i].award;
        } else if (data[i].program == "SEV_DIST") {
          sevGrants += data[i].award;
        } else if (data[i].program == "VFP") {
          vfpGrants += data[i].award;
        } else if (data[i].program == "FFB") {
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
        }  
      }
    }
  }

  document.getElementById("county").innerHTML = searchCounty + " County";
  document.getElementById("year").innerHTML = " from " + searchYear + " to " + toYear;
  document.getElementById("totals").innerHTML = numeral(totalGrants).format();
  document.getElementById("ctf").innerHTML = numeral(ctfGrants).format();
  document.getElementById("eiaf").innerHTML = numeral(eiafGrants).format();
  document.getElementById("directdist").innerHTML = numeral(sevGrants+fmlGrants).format();
//  document.getElementById("fml").innerHTML = numeral(fmlGrants).format();
  document.getElementById("vfp").innerHTML = numeral(vfpGrants).format();
  document.getElementById("ffb").innerHTML = numeral(ffbGrants).format();
  document.getElementById("cdbg").innerHTML = numeral(cdbgGrants).format();
  document.getElementById("csbg").innerHTML = numeral(csbgGrants).format();
  document.getElementById("redi").innerHTML = numeral(rediGrants).format();
  document.getElementById("game").innerHTML = numeral(gamingGrants).format();
  document.getElementById("mj").innerHTML = numeral(mjGrants).format();
  document.getElementById("dr").innerHTML = numeral(DR).format();
  document.getElementById("ms").innerHTML = numeral(MS).format();
  document.getElementById("sar").innerHTML = numeral(MS).format();
  document.getElementById("pomh").innerHTML = numeral(POMH).format();
  document.getElementById("dcfa").innerHTML = numeral(DCFA).format();
  document.getElementById("ccpi").innerHTML = numeral(CCPI).format();
  document.getElementById("chpg").innerHTML = numeral(CHPG).format();    
  document.getElementById("cvrf").innerHTML = numeral(CVRF).format();

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
          backgroundColor: '#ffff99'
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
        }
    ]
}
  });
  
  
  
}