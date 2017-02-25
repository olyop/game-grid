const teams = [
  {
    "TeamID": 1,
    "Key": "WAS",
    "Active": true,
    "City": "Washington",
    "Name": "Wizards",
    "LeagueID": 3,
    "StadiumID": 1,
    "Conference": "Eastern",
    "Division": "Southeast",
    "PrimaryColor": "E31837",
    "SecondaryColor": "002B5C",
    "TertiaryColor": "C4CED4",
    "QuaternaryColor": "FFFFFF",
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/8/82/Wizards_clipped_rev_1.png",
    "WikipediaWordMarkUrl": null,
    "GlobalTeamID": 20000001
  },
  {
    "TeamID": 2,
    "Key": "CHA",
    "Active": true,
    "City": "Charlotte",
    "Name": "Hornets",
    "LeagueID": 3,
    "StadiumID": 2,
    "Conference": "Eastern",
    "Division": "Southeast",
    "PrimaryColor": "1D1160",
    "SecondaryColor": "00788C",
    "TertiaryColor": "A1A1A4",
    "QuaternaryColor": "FFFFFF",
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/c/c4/Charlotte_Hornets_%282014%29.svg",
    "WikipediaWordMarkUrl": null,
    "GlobalTeamID": 20000002
  },
  {
    "TeamID": 3,
    "Key": "ATL",
    "Active": true,
    "City": "Atlanta",
    "Name": "Hawks",
    "LeagueID": 3,
    "StadiumID": 3,
    "Conference": "Eastern",
    "Division": "Southeast",
    "PrimaryColor": "E03A3E",
    "SecondaryColor": "C1D32F",
    "TertiaryColor": "26282A",
    "QuaternaryColor": "FFFFFF",
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/6/63/Atlanta_Hawks_2015_Primary_Logo.png",
    "WikipediaWordMarkUrl": null,
    "GlobalTeamID": 20000003
  },
  {
    "TeamID": 4,
    "Key": "MIA",
    "Active": true,
    "City": "Miami",
    "Name": "Heat",
    "LeagueID": 3,
    "StadiumID": 4,
    "Conference": "Eastern",
    "Division": "Southeast",
    "PrimaryColor": "98002E",
    "SecondaryColor": "F9A01B",
    "TertiaryColor": "0",
    "QuaternaryColor": "FFFFFF",
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/f/fb/Miami_Heat_logo.svg",
    "WikipediaWordMarkUrl": null,
    "GlobalTeamID": 20000004
  },
  {
    "TeamID": 5,
    "Key": "ORL",
    "Active": true,
    "City": "Orlando",
    "Name": "Magic",
    "LeagueID": 3,
    "StadiumID": 5,
    "Conference": "Eastern",
    "Division": "Southeast",
    "PrimaryColor": "0077C0",
    "SecondaryColor": "0",
    "TertiaryColor": "C4CED4",
    "QuaternaryColor": "FFFFFF",
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/8/85/Orlando_magic_logo.png",
    "WikipediaWordMarkUrl": null,
    "GlobalTeamID": 20000005
  },
  {
    "TeamID": 6,
    "Key": "NY",
    "Active": true,
    "City": "New York",
    "Name": "Knicks",
    "LeagueID": 3,
    "StadiumID": 6,
    "Conference": "Eastern",
    "Division": "Atlantic",
    "PrimaryColor": "006BB6",
    "SecondaryColor": "F58426",
    "TertiaryColor": "BEC0C2",
    "QuaternaryColor": "0",
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/d/d8/NewYorkKnicks.PNG",
    "WikipediaWordMarkUrl": null,
    "GlobalTeamID": 20000006
  },
  {
    "TeamID": 7,
    "Key": "PHI",
    "Active": true,
    "City": "Philadelphia",
    "Name": "76ers",
    "LeagueID": 3,
    "StadiumID": 7,
    "Conference": "Eastern",
    "Division": "Atlantic",
    "PrimaryColor": "ED174C",
    "SecondaryColor": "006BB6",
    "TertiaryColor": "FFFFFF",
    "QuaternaryColor": null,
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/b/ba/Philadelphia_76ers_Logo.png",
    "WikipediaWordMarkUrl": null,
    "GlobalTeamID": 20000007
  },
  {
    "TeamID": 8,
    "Key": "BKN",
    "Active": true,
    "City": "Brooklyn",
    "Name": "Nets",
    "LeagueID": 3,
    "StadiumID": 8,
    "Conference": "Eastern",
    "Division": "Atlantic",
    "PrimaryColor": "0",
    "SecondaryColor": "FFFFFF",
    "TertiaryColor": null,
    "QuaternaryColor": null,
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/commons/4/44/Brooklyn_Nets_newlogo.svg",
    "WikipediaWordMarkUrl": null,
    "GlobalTeamID": 20000008
  },
  {
    "TeamID": 9,
    "Key": "BOS",
    "Active": true,
    "City": "Boston",
    "Name": "Celtics",
    "LeagueID": 3,
    "StadiumID": 9,
    "Conference": "Eastern",
    "Division": "Atlantic",
    "PrimaryColor": "8348",
    "SecondaryColor": "BB9753",
    "TertiaryColor": "0",
    "QuaternaryColor": "FFFFFF",
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/8/8f/Boston_Celtics.svg",
    "WikipediaWordMarkUrl": null,
    "GlobalTeamID": 20000009
  },
  {
    "TeamID": 10,
    "Key": "TOR",
    "Active": true,
    "City": "Toronto",
    "Name": "Raptors",
    "LeagueID": 3,
    "StadiumID": 10,
    "Conference": "Eastern",
    "Division": "Atlantic",
    "PrimaryColor": "CE1141",
    "SecondaryColor": "0",
    "TertiaryColor": "A1A1A4",
    "QuaternaryColor": "FFFFFF",
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/1/1e/Toronto_Raptors_logo_2015-16.png",
    "WikipediaWordMarkUrl": null,
    "GlobalTeamID": 20000010
  },
  {
    "TeamID": 11,
    "Key": "CHI",
    "Active": true,
    "City": "Chicago",
    "Name": "Bulls",
    "LeagueID": 3,
    "StadiumID": 11,
    "Conference": "Eastern",
    "Division": "Central",
    "PrimaryColor": "CE1141",
    "SecondaryColor": "0",
    "TertiaryColor": "FFFFFF",
    "QuaternaryColor": null,
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/6/67/Chicago_Bulls_logo.svg",
    "WikipediaWordMarkUrl": null,
    "GlobalTeamID": 20000011
  },
  {
    "TeamID": 12,
    "Key": "CLE",
    "Active": true,
    "City": "Cleveland",
    "Name": "Cavaliers",
    "LeagueID": 3,
    "StadiumID": 12,
    "Conference": "Eastern",
    "Division": "Central",
    "PrimaryColor": "860038",
    "SecondaryColor": "FDBB30",
    "TertiaryColor": "002D62",
    "QuaternaryColor": "FFFFFF",
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/f/f7/Cleveland_Cavaliers_2010.svg",
    "WikipediaWordMarkUrl": null,
    "GlobalTeamID": 20000012
  },
  {
    "TeamID": 13,
    "Key": "IND",
    "Active": true,
    "City": "Indiana",
    "Name": "Pacers",
    "LeagueID": 3,
    "StadiumID": 13,
    "Conference": "Eastern",
    "Division": "Central",
    "PrimaryColor": "002D62",
    "SecondaryColor": "FDBB30",
    "TertiaryColor": "BEC0C2",
    "QuaternaryColor": "FFFFFF",
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/1/1b/Indiana_Pacers.svg",
    "WikipediaWordMarkUrl": null,
    "GlobalTeamID": 20000013
  },
  {
    "TeamID": 14,
    "Key": "DET",
    "Active": true,
    "City": "Detroit",
    "Name": "Pistons",
    "LeagueID": 3,
    "StadiumID": 14,
    "Conference": "Eastern",
    "Division": "Central",
    "PrimaryColor": "ED174C",
    "SecondaryColor": "006BB6",
    "TertiaryColor": "002D62",
    "QuaternaryColor": "FFFFFF",
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/1/1e/Detroit_Pistons_logo.svg",
    "WikipediaWordMarkUrl": null,
    "GlobalTeamID": 20000014
  },
  {
    "TeamID": 15,
    "Key": "MIL",
    "Active": true,
    "City": "Milwaukee",
    "Name": "Bucks",
    "LeagueID": 3,
    "StadiumID": 15,
    "Conference": "Eastern",
    "Division": "Central",
    "PrimaryColor": "00471B",
    "SecondaryColor": "EEE1C6",
    "TertiaryColor": "0077C0",
    "QuaternaryColor": "0",
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/9/9a/Milwaukee_Bucks_logo15.png",
    "WikipediaWordMarkUrl": null,
    "GlobalTeamID": 20000015
  },
  {
    "TeamID": 16,
    "Key": "MIN",
    "Active": true,
    "City": "Minnesota",
    "Name": "Timberwolves",
    "LeagueID": 3,
    "StadiumID": 16,
    "Conference": "Western",
    "Division": "Northwest",
    "PrimaryColor": "5083",
    "SecondaryColor": "C4CED4",
    "TertiaryColor": "0",
    "QuaternaryColor": "FFFFFF",
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/7/78/Minnesota_Timberwolves.svg",
    "WikipediaWordMarkUrl": null,
    "GlobalTeamID": 20000016
  },
  {
    "TeamID": 17,
    "Key": "UTA",
    "Active": true,
    "City": "Utah",
    "Name": "Jazz",
    "LeagueID": 3,
    "StadiumID": 17,
    "Conference": "Western",
    "Division": "Northwest",
    "PrimaryColor": "002B5C",
    "SecondaryColor": "F9A01B",
    "TertiaryColor": "00471B",
    "QuaternaryColor": "FFFFFF",
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/c/c2/Utah_Jazz_primary_logo_2016%E2%80%93present.png",
    "WikipediaWordMarkUrl": null,
    "GlobalTeamID": 20000017
  },
  {
    "TeamID": 18,
    "Key": "OKC",
    "Active": true,
    "City": "Oklahoma City",
    "Name": "Thunder",
    "LeagueID": 3,
    "StadiumID": 18,
    "Conference": "Western",
    "Division": "Northwest",
    "PrimaryColor": "007AC1",
    "SecondaryColor": "F05133",
    "TertiaryColor": "FDBB30",
    "QuaternaryColor": "002D62",
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/5/5d/Oklahoma_City_Thunder.svg",
    "WikipediaWordMarkUrl": null,
    "GlobalTeamID": 20000018
  },
  {
    "TeamID": 19,
    "Key": "POR",
    "Active": true,
    "City": "Portland",
    "Name": "Trail Blazers",
    "LeagueID": 3,
    "StadiumID": 19,
    "Conference": "Western",
    "Division": "Northwest",
    "PrimaryColor": "E03A3E",
    "SecondaryColor": "0",
    "TertiaryColor": "C4CED4",
    "QuaternaryColor": "FFFFFF",
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/thumb/7/74/Portland_Trail_Blazers.svg/205px-Portland_Trail_Blazers.svg.png",
    "WikipediaWordMarkUrl": null,
    "GlobalTeamID": 20000019
  },
  {
    "TeamID": 20,
    "Key": "DEN",
    "Active": true,
    "City": "Denver",
    "Name": "Nuggets",
    "LeagueID": 3,
    "StadiumID": 20,
    "Conference": "Western",
    "Division": "Northwest",
    "PrimaryColor": "00285E",
    "SecondaryColor": "5091CD",
    "TertiaryColor": "FDB927",
    "QuaternaryColor": "FFFFFF",
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/7/76/Denver_Nuggets.svg",
    "WikipediaWordMarkUrl": null,
    "GlobalTeamID": 20000020
  },
  {
    "TeamID": 21,
    "Key": "MEM",
    "Active": true,
    "City": "Memphis",
    "Name": "Grizzlies",
    "LeagueID": 3,
    "StadiumID": 21,
    "Conference": "Western",
    "Division": "Southwest",
    "PrimaryColor": "00285E",
    "SecondaryColor": "6189B9",
    "TertiaryColor": "BED4E9",
    "QuaternaryColor": "FDB927",
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/f/f1/Memphis_Grizzlies.svg",
    "WikipediaWordMarkUrl": null,
    "GlobalTeamID": 20000021
  },
  {
    "TeamID": 22,
    "Key": "HOU",
    "Active": true,
    "City": "Houston",
    "Name": "Rockets",
    "LeagueID": 3,
    "StadiumID": 22,
    "Conference": "Western",
    "Division": "Southwest",
    "PrimaryColor": "CE1141",
    "SecondaryColor": "C4CED4",
    "TertiaryColor": "0",
    "QuaternaryColor": "FFFFFF",
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/2/28/Houston_Rockets.svg",
    "WikipediaWordMarkUrl": null,
    "GlobalTeamID": 20000022
  },
  {
    "TeamID": 23,
    "Key": "NO",
    "Active": true,
    "City": "New Orleans",
    "Name": "Pelicans",
    "LeagueID": 3,
    "StadiumID": 23,
    "Conference": "Western",
    "Division": "Southwest",
    "PrimaryColor": "002B5C",
    "SecondaryColor": "B4975A",
    "TertiaryColor": "E31837",
    "QuaternaryColor": "FFFFFF",
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/2/21/New_Orleans_Pelicans.png",
    "WikipediaWordMarkUrl": null,
    "GlobalTeamID": 20000023
  },
  {
    "TeamID": 24,
    "Key": "SA",
    "Active": true,
    "City": "San Antonio",
    "Name": "Spurs",
    "LeagueID": 3,
    "StadiumID": 24,
    "Conference": "Western",
    "Division": "Southwest",
    "PrimaryColor": "0",
    "SecondaryColor": "C4CED4",
    "TertiaryColor": "FFFFFF",
    "QuaternaryColor": null,
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/a/a2/San_Antonio_Spurs.svg",
    "WikipediaWordMarkUrl": null,
    "GlobalTeamID": 20000024
  },
  {
    "TeamID": 25,
    "Key": "DAL",
    "Active": true,
    "City": "Dallas",
    "Name": "Mavericks",
    "LeagueID": 3,
    "StadiumID": 25,
    "Conference": "Western",
    "Division": "Southwest",
    "PrimaryColor": "005DC5",
    "SecondaryColor": "C4CED4",
    "TertiaryColor": "0",
    "QuaternaryColor": "FFFFFF",
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/9/97/Dallas_Mavericks_logo.svg",
    "WikipediaWordMarkUrl": null,
    "GlobalTeamID": 20000025
  },
  {
    "TeamID": 26,
    "Key": "GS",
    "Active": true,
    "City": "Golden State",
    "Name": "Warriors",
    "LeagueID": 3,
    "StadiumID": 26,
    "Conference": "Western",
    "Division": "Pacific",
    "PrimaryColor": "006BB6",
    "SecondaryColor": "FDB927",
    "TertiaryColor": "26282A",
    "QuaternaryColor": "FFFFFF",
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/0/01/Golden_State_Warriors_logo.svg",
    "WikipediaWordMarkUrl": null,
    "GlobalTeamID": 20000026
  },
  {
    "TeamID": 27,
    "Key": "LAL",
    "Active": true,
    "City": "Los Angeles",
    "Name": "Lakers",
    "LeagueID": 3,
    "StadiumID": 27,
    "Conference": "Western",
    "Division": "Pacific",
    "PrimaryColor": "FDB927",
    "SecondaryColor": "552583",
    "TertiaryColor": "0",
    "QuaternaryColor": "FFFFFF",
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/commons/c/c0/LosAngeles_Lakers_logo.svg",
    "WikipediaWordMarkUrl": null,
    "GlobalTeamID": 20000027
  },
  {
    "TeamID": 28,
    "Key": "LAC",
    "Active": true,
    "City": "Los Angeles",
    "Name": "Clippers",
    "LeagueID": 3,
    "StadiumID": 27,
    "Conference": "Western",
    "Division": "Pacific",
    "PrimaryColor": "ED174C",
    "SecondaryColor": "006BB6",
    "TertiaryColor": "0",
    "QuaternaryColor": "BEC0C2",
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/b/bb/Los_Angeles_Clippers_%282015%29.svg",
    "WikipediaWordMarkUrl": null,
    "GlobalTeamID": 20000028
  },
  {
    "TeamID": 29,
    "Key": "PHO",
    "Active": true,
    "City": "Phoenix",
    "Name": "Suns",
    "LeagueID": 3,
    "StadiumID": 28,
    "Conference": "Western",
    "Division": "Pacific",
    "PrimaryColor": "E56020",
    "SecondaryColor": "1D1160",
    "TertiaryColor": "0",
    "QuaternaryColor": "63727A",
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/e/e7/Phoenix_Suns_2013_LOGO.png",
    "WikipediaWordMarkUrl": null,
    "GlobalTeamID": 20000029
  },
  {
    "TeamID": 30,
    "Key": "SAC",
    "Active": true,
    "City": "Sacramento",
    "Name": "Kings",
    "LeagueID": 3,
    "StadiumID": 29,
    "Conference": "Western",
    "Division": "Pacific",
    "PrimaryColor": "5A2B81",
    "SecondaryColor": "63727A",
    "TertiaryColor": "0",
    "QuaternaryColor": "FFFFFF",
    "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/c/c7/SacramentoKings.svg",
    "WikipediaWordMarkUrl": null,
    "GlobalTeamID": 20000030
  }
]

export default teams