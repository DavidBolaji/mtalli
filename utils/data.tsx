

import { deleteEvents } from "@/actions/get-events";
import { ICON } from "@/constants/icon";
import { FacebookIcon } from "@/constants/icons/facebook";
import { InstagramIcon } from "@/constants/icons/instagram";
import { LinkedInIcon } from "@/constants/icons/linkedin";
import { TwitterIcon } from "@/constants/icons/twitter";
import { FontSizeIcon } from "@radix-ui/react-icons";
import { Bold, Eraser, Image, Indent, Italic, Outdent, Redo, Strikethrough, Subscript, Superscript, Underline, Undo } from "lucide-react";
import { ReactNode } from "react";

export const footerNav = [
  {
    title: "Shop",
    navs: [
      {
        name: "Chicken",
        link: "",
      },
      {
        name: "Beef",
        link: "",
      },
      {
        name: "Goat",
        link: "",
      },
      {
        name: "Speciality Meats",
        link: "",
      },
      {
        name: "Sale Items",
        link: "",
      },
      {
        name: "Best Sellers",
        link: "",
      },
    ],
  },
  {
    title: "Resources",
    navs: [
      {
        name: "Cooking Tips",
        link: "",
      },
      {
        name: "Recipes",
        link: "",
      },
      {
        name: "Meat Handling Guidelines",
        link: "",
      },
      {
        name: "FAQs",
        link: "",
      },
    ],
  },
  {
    title: "Account",
    navs: [
      {
        name: "Sign In",
        link: "",
      },
      {
        name: "Create Account",
        link: "",
      },
      {
        name: "Order History",
        link: "",
      },
    ],
  },
  {
    title: "Customer Service",
    navs: [
      {
        name: "Contact Us",
        link: "",
      },
      {
        name: "Order Tracking",
        link: "",
      },
      {
        name: "Returns & Refunds",
        link: "",
      },
      {
        name: "Shipping Information",
        link: "",
      },
    ],
  },
  {
    title: "About Us",
    socials: [
      {
        icon: <FacebookIcon />,
      },
      {
        icon: <InstagramIcon />,
      },
      {
        icon: <LinkedInIcon />,
      },
      {
        icon: <TwitterIcon />,
      },
    ],
    navs: [
      {
        name: "Our Story",
        link: "",
      },
      {
        name: "Quality Commitment",
        link: "",
      },
      {
        name: "Meet Our Experts",
        link: "",
      },
    ],
  },
];

export type ICollapseData = {
  key: string;
  label: string | ReactNode;
  children: React.ReactNode;
};

export const collapseData: ICollapseData[] = [
  {
    key: "faq1",
    label: "Is the chicken breast fresh or frozen?",
    children: (
      <p className="bg-white w-full h-full ">
        Our chicken breast is delivered fresh, never frozen, to ensure the best
        quality and flavour.
      </p>
    ),
  },
  {
    key: "faq2",
    label: "How should I store chicken breast after delivery?",
    children: <p className="">hi</p>,
  },
  {
    key: "faq3",
    label: "How long does it take to cook chicken breast?",
    children: <p className="">hi</p>,
  },
  {
    key: "faq4",
    label: "Are your chicken breasts free from hormones and antibiotics?",
    children: <p className="">hi</p>,
  },
];

export const collapseData2: ICollapseData[] = [
  {
    key: "faq5",
    label: "How long does it take to cook chicken breast?",
    children: (
      <p className="">
        Yes, all our chicken is free from added hormones and antibiotics,
        sourced from trusted farms.
      </p>
    ),
  },
  {
    key: "faq6",
    label: "What is the weight of each chicken breast?",
    children: (
      <p className="md:text-[20px] text-[1rem] text-ash_400 md:leading-[2rem] leading-[1.5rem] md:tracking-[-0.025rem] tracking-[-0.02rem]">
        hi
      </p>
    ),
  },
  {
    key: "faq7",
    label: "Do you offer organic chicken breast?",
    children: (
      <p className="md:text-[20px] text-[1rem] text-ash_400 md:leading-[2rem] leading-[1.5rem] md:tracking-[-0.025rem] tracking-[-0.02rem]">
        hi
      </p>
    ),
  },
];

export const countries: { name: string; country_code: string }[] = [
  { name: 'Afghanistan', country_code: 'AF' },
  { name: 'Albania', country_code: 'AL' },
  { name: 'Algeria', country_code: 'DZ' },
  { name: 'Andorra', country_code: 'AD' },
  { name: 'Angola', country_code: 'AO' },
  { name: 'Antigua and Barbuda', country_code: 'AG' },
  { name: 'Argentina', country_code: 'AR' },
  { name: 'Armenia', country_code: 'AM' },
  { name: 'Australia', country_code: 'AU' },
  { name: 'Austria', country_code: 'AT' },
  { name: 'Azerbaijan', country_code: 'AZ' },
  { name: 'Bahamas', country_code: 'BS' },
  { name: 'Bahrain', country_code: 'BH' },
  { name: 'Bangladesh', country_code: 'BD' },
  { name: 'Barbados', country_code: 'BB' },
  { name: 'Belarus', country_code: 'BY' },
  { name: 'Belgium', country_code: 'BE' },
  { name: 'Belize', country_code: 'BZ' },
  { name: 'Benin', country_code: 'BJ' },
  { name: 'Bhutan', country_code: 'BT' },
  { name: 'Bolivia', country_code: 'BO' },
  { name: 'Bosnia and Herzegovina', country_code: 'BA' },
  { name: 'Botswana', country_code: 'BW' },
  { name: 'Brazil', country_code: 'BR' },
  { name: 'Brunei', country_code: 'BN' },
  { name: 'Bulgaria', country_code: 'BG' },
  { name: 'Burkina Faso', country_code: 'BF' },
  { name: 'Burundi', country_code: 'BI' },
  { name: 'Cabo Verde', country_code: 'CV' },
  { name: 'Cambodia', country_code: 'KH' },
  { name: 'Cameroon', country_code: 'CM' },
  { name: 'Canada', country_code: 'CA' },
  { name: 'Central African Republic', country_code: 'CF' },
  { name: 'Chad', country_code: 'TD' },
  { name: 'Chile', country_code: 'CL' },
  { name: 'China', country_code: 'CN' },
  { name: 'Colombia', country_code: 'CO' },
  { name: 'Comoros', country_code: 'KM' },
  { name: 'Congo (Congo-Brazzaville)', country_code: 'CG' },
  { name: 'Costa Rica', country_code: 'CR' },
  { name: 'Croatia', country_code: 'HR' },
  { name: 'Cuba', country_code: 'CU' },
  { name: 'Cyprus', country_code: 'CY' },
  { name: 'Czech Republic', country_code: 'CZ' },
  { name: 'Democratic Republic of the Congo', country_code: 'CD' },
  { name: 'Denmark', country_code: 'DK' },
  { name: 'Djibouti', country_code: 'DJ' },
  { name: 'Dominica', country_code: 'DM' },
  { name: 'Dominican Republic', country_code: 'DO' },
  { name: 'Ecuador', country_code: 'EC' },
  { name: 'Egypt', country_code: 'EG' },
  { name: 'El Salvador', country_code: 'SV' },
  { name: 'Equatorial Guinea', country_code: 'GQ' },
  { name: 'Eritrea', country_code: 'ER' },
  { name: 'Estonia', country_code: 'EE' },
  { name: 'Eswatini (fmr. Swaziland)', country_code: 'SZ' },
  { name: 'Ethiopia', country_code: 'ET' },
  { name: 'Fiji', country_code: 'FJ' },
  { name: 'Finland', country_code: 'FI' },
  { name: 'France', country_code: 'FR' },
  { name: 'Gabon', country_code: 'GA' },
  { name: 'Gambia', country_code: 'GM' },
  { name: 'Georgia', country_code: 'GE' },
  { name: 'Germany', country_code: 'DE' },
  { name: 'Ghana', country_code: 'GH' },
  { name: 'Greece', country_code: 'GR' },
  { name: 'Grenada', country_code: 'GD' },
  { name: 'Guatemala', country_code: 'GT' },
  { name: 'Guinea', country_code: 'GN' },
  { name: 'Guinea-Bissau', country_code: 'GW' },
  { name: 'Guyana', country_code: 'GY' },
  { name: 'Haiti', country_code: 'HT' },
  { name: 'Honduras', country_code: 'HN' },
  { name: 'Hungary', country_code: 'HU' },
  { name: 'Iceland', country_code: 'IS' },
  { name: 'India', country_code: 'IN' },
  { name: 'Indonesia', country_code: 'ID' },
  { name: 'Iran', country_code: 'IR' },
  { name: 'Iraq', country_code: 'IQ' },
  { name: 'Ireland', country_code: 'IE' },
  { name: 'Israel', country_code: 'IL' },
  { name: 'Italy', country_code: 'IT' },
  { name: 'Ivory Coast', country_code: 'CI' },
  { name: 'Jamaica', country_code: 'JM' },
  { name: 'Japan', country_code: 'JP' },
  { name: 'Jordan', country_code: 'JO' },
  { name: 'Kazakhstan', country_code: 'KZ' },
  { name: 'Kenya', country_code: 'KE' },
  { name: 'Kiribati', country_code: 'KI' },
  { name: 'Kuwait', country_code: 'KW' },
  { name: 'Kyrgyzstan', country_code: 'KG' },
  { name: 'Laos', country_code: 'LA' },
  { name: 'Latvia', country_code: 'LV' },
  { name: 'Lebanon', country_code: 'LB' },
  { name: 'Lesotho', country_code: 'LS' },
  { name: 'Liberia', country_code: 'LR' },
  { name: 'Libya', country_code: 'LY' },
  { name: 'Liechtenstein', country_code: 'LI' },
  { name: 'Lithuania', country_code: 'LT' },
  { name: 'Luxembourg', country_code: 'LU' },
  { name: 'Madagascar', country_code: 'MG' },
  { name: 'Malawi', country_code: 'MW' },
  { name: 'Malaysia', country_code: 'MY' },
  { name: 'Maldives', country_code: 'MV' },
  { name: 'Mali', country_code: 'ML' },
  { name: 'Malta', country_code: 'MT' },
  { name: 'Marshall Islands', country_code: 'MH' },
  { name: 'Mauritania', country_code: 'MR' },
  { name: 'Mauritius', country_code: 'MU' },
  { name: 'Mexico', country_code: 'MX' },
  { name: 'Micronesia', country_code: 'FM' },
  { name: 'Moldova', country_code: 'MD' },
  { name: 'Monaco', country_code: 'MC' },
  { name: 'Mongolia', country_code: 'MN' },
  { name: 'Montenegro', country_code: 'ME' },
  { name: 'Morocco', country_code: 'MA' },
  { name: 'Mozambique', country_code: 'MZ' },
  { name: 'Myanmar (formerly Burma)', country_code: 'MM' },
  { name: 'Namibia', country_code: 'NA' },
  { name: 'Nauru', country_code: 'NR' },
  { name: 'Nepal', country_code: 'NP' },
  { name: 'Netherlands', country_code: 'NL' },
  { name: 'New Zealand', country_code: 'NZ' },
  { name: 'Nicaragua', country_code: 'NI' },
  { name: 'Niger', country_code: 'NE' },
  { name: 'Nigeria', country_code: 'NG' },
  { name: 'North Korea', country_code: 'KP' },
  { name: 'North Macedonia', country_code: 'MK' },
  { name: 'Norway', country_code: 'NO' },
  { name: 'Oman', country_code: 'OM' },
  { name: 'Pakistan', country_code: 'PK' },
  { name: 'Palau', country_code: 'PW' },
  { name: 'Palestine State', country_code: 'PS' },
  { name: 'Panama', country_code: 'PA' },
  { name: 'Papua New Guinea', country_code: 'PG' },
  { name: 'Paraguay', country_code: 'PY' },
  { name: 'Peru', country_code: 'PE' },
  { name: 'Philippines', country_code: 'PH' },
  { name: 'Poland', country_code: 'PL' },
  { name: 'Portugal', country_code: 'PT' },
  { name: 'Qatar', country_code: 'QA' },
  { name: 'Romania', country_code: 'RO' },
  { name: 'Russia', country_code: 'RU' },
  { name: 'Rwanda', country_code: 'RW' },
  { name: 'Saint Kitts and Nevis', country_code: 'KN' },
  { name: 'Saint Lucia', country_code: 'LC' },
  { name: 'Saint Vincent and the Grenadines', country_code: 'VC' },
  { name: 'Samoa', country_code: 'WS' },
  { name: 'San Marino', country_code: 'SM' },
  { name: 'Sao Tome and Principe', country_code: 'ST' },
  { name: 'Saudi Arabia', country_code: 'SA' },
  { name: 'Senegal', country_code: 'SN' },
  { name: 'Serbia', country_code: 'RS' },
  { name: 'Seychelles', country_code: 'SC' },
  { name: 'Sierra Leone', country_code: 'SL' },
  { name: 'Singapore', country_code: 'SG' },
  { name: 'Slovakia', country_code: 'SK' },
  { name: 'Slovenia', country_code: 'SI' },
  { name: 'Solomon Islands', country_code: 'SB' },
  { name: 'Somalia', country_code: 'SO' },
  { name: 'South Africa', country_code: 'ZA' },
  { name: 'South Korea', country_code: 'KR' },
  { name: 'South Sudan', country_code: 'SS' },
  { name: 'Spain', country_code: 'ES' },
  { name: 'Sri Lanka', country_code: 'LK' },
  { name: 'Sudan', country_code: 'SD' },
  { name: 'Suriname', country_code: 'SR' },
  { name: 'Sweden', country_code: 'SE' },
  { name: 'Switzerland', country_code: 'CH' },
  { name: 'Syria', country_code: 'SY' },
  { name: 'Taiwan', country_code: 'TW' },
  { name: 'Tajikistan', country_code: 'TJ' },
  { name: 'Tanzania', country_code: 'TZ' },
  { name: 'Thailand', country_code: 'TH' },
  { name: 'Timor-Leste', country_code: 'TL' },
  { name: 'Togo', country_code: 'TG' },
  { name: 'Tonga', country_code: 'TO' },
  { name: 'Trinidad and Tobago', country_code: 'TT' },
  { name: 'Tunisia', country_code: 'TN' },
  { name: 'Turkey', country_code: 'TR' },
  { name: 'Turkmenistan', country_code: 'TM' },
  { name: 'Tuvalu', country_code: 'TV' },
  { name: 'Uganda', country_code: 'UG' },
  { name: 'Ukraine', country_code: 'UA' },
  { name: 'United Arab Emirates', country_code: 'AE' },
  { name: 'United Kingdom', country_code: 'GB' },
  { name: 'United States of America', country_code: 'US' },
  { name: 'Uruguay', country_code: 'UY' },
  { name: 'Uzbekistan', country_code: 'UZ' },
  { name: 'Vanuatu', country_code: 'VU' },
  { name: 'Vatican City', country_code: 'VA' },
  { name: 'Venezuela', country_code: 'VE' },
  { name: 'Vietnam', country_code: 'VN' },
  { name: 'Yemen', country_code: 'YE' },
  { name: 'Zambia', country_code: 'ZM' },
  { name: 'Zimbabwe', country_code: 'ZW' },
]

export const states: { [key: string]: { name: string; state_code: string }[] } =
  {
    Nigeria: [
      { name: "Abia State", state_code: "AB" },
      { name: "Adamawa State", state_code: "AD" },
      { name: "Akwa Ibom State", state_code: "AK" },
      { name: "Anambra State", state_code: "AN" },
      { name: "Bauchi State", state_code: "BA" },
      { name: "Bayelsa State", state_code: "BY" },
      { name: "Benue State", state_code: "BE" },
      { name: "Borno State", state_code: "BO" },
      { name: "Cross River State", state_code: "CR" },
      { name: "Delta State", state_code: "DE" },
      { name: "Ebonyi State", state_code: "EB" },
      { name: "Edo State", state_code: "ED" },
      { name: "Ekiti State", state_code: "EK" },
      { name: "Enugu State", state_code: "EN" },
      { name: "Federal Capital Territory", state_code: "FC" },
      { name: "Gombe State", state_code: "GO" },
      { name: "Imo State", state_code: "IM" },
      { name: "Jigawa State", state_code: "JI" },
      { name: "Kaduna State", state_code: "KD" },
      { name: "Kano State", state_code: "KN" },
      { name: "Katsina State", state_code: "KT" },
      { name: "Kebbi State", state_code: "KE" },
      { name: "Kogi State", state_code: "KO" },
      { name: "Kwara State", state_code: "KW" },
      { name: "Lagos State", state_code: "LA" },
      { name: "Nasarawa State", state_code: "NA" },
      { name: "Niger State", state_code: "NI" },
      { name: "Ogun State", state_code: "OG" },
      { name: "Ondo State", state_code: "ON" },
      { name: "Osun State", state_code: "OS" },
      { name: "Oyo State", state_code: "OY" },
      { name: "Plateau State", state_code: "PL" },
      { name: "Sokoto State", state_code: "SO" },
      { name: "Taraba State", state_code: "TA" },
      { name: "Yobe State", state_code: "YO" },
      { name: "Zamfara State", state_code: "ZA" },
    ],
  };

export const cities = {
  "Abia State": [
    "Aba",
    "Amaigbo",
    "Arochukwu",
    "Bende",
    "Ohafia-Ifigh",
    "Umuahia",
  ],
  "Adamawa State": [
    "Ganye",
    "Gombi",
    "Holma",
    "Jimeta",
    "Madagali",
    "Mayo-Belwa",
    "Mubi",
    "Ngurore",
    "Numan",
    "Toungo",
    "Yola",
  ],
  "Akwa Ibom State": ["Eket", "Esuk Oron", "Ikot Ekpene", "Itu", "Uyo"],
  "Anambra State": [
    "Agulu",
    "Atani",
    "Awka",
    "Enugu-Ukwu",
    "Igbo-Ukwu",
    "Ihiala",
    "Nkpor",
    "Nnewi",
    "Onitsha",
    "Ozubulu",
    "Uga",
    "Uruobo-Okija",
  ],
  "Bauchi State": [
    "Azare",
    "Bauchi",
    "Boi",
    "Bununu",
    "Darazo",
    "Dass",
    "Dindima",
    "Disina",
    "Gabarin",
    "Gwaram",
    "Kari",
    "Lame",
    "Lere",
    "Madara",
    "Misau",
    "Sade",
    "Yamrat",
    "Yanda Bayo",
    "Yuli",
    "Zadawa",
    "Zalanga",
  ],
  "Bayelsa State": ["Amassoma", "Twon-Brass", "Yenagoa"],
  "Benue State": [
    "Aliade",
    "Boju",
    "Igbor",
    "Makurdi",
    "Ochobo",
    "Otukpa",
    "Takum",
    "Ugbokpo",
    "Yandev",
    "Zaki Biam",
  ],
  "Borno State": [
    "Bama",
    "Benisheikh",
    "Biu",
    "Bornu Yassu",
    "Damasak",
    "Damboa",
    "Dikwa",
    "Gamboru",
    "Gwoza",
    "Kukawa",
    "Magumeri",
    "Maiduguri",
    "Marte",
    "Miringa",
    "Monguno",
    "Ngala",
    "Shaffa",
    "Shani",
    "Tokombere",
    "Uba",
    "Wuyo",
    "Yajiwa",
  ],
  "Cross River State": ["Akankpa", "Calabar", "Gakem", "Ikang", "Ugep"],
  "Delta State": [
    "Abraka",
    "Agbor",
    "Asaba",
    "Bomadi",
    "Burutu",
    "Kwale",
    "Obiaruku",
    "Ogwashi-Uku",
    "Orerokpe",
    "Patani",
    "Sapele",
    "Ughelli",
    "Umunede",
    "Warri",
  ],
  "Ebonyi State": ["Abakaliki", "Afikpo", "Effium", "Ezza-Ohu", "Isieke"],
  "Edo State": [
    "Agenebode",
    "Auchi",
    "Benin City",
    "Ekpoma",
    "Igarra",
    "Illushi",
    "Siluko",
    "Ubiaja",
    "Uromi",
  ],
  "Ekiti State": [
    "Ado-Ekiti",
    "Aramoko-Ekiti",
    "Efon-Alaaye",
    "Emure-Ekiti",
    "Ifaki",
    "Igbara-Odo",
    "Igede-Ekiti",
    "Ijero-Ekiti",
    "Ikere-Ekiti",
    "Ipoti",
    "Ise-Ekiti",
    "Oke Ila",
    "Omuo-Ekiti",
  ],
  "Enugu State": [
    "Adani",
    "Ake-Eze",
    "Aku",
    "Amagunze",
    "Awgu",
    "Eha Amufu",
    "Enugu",
    "Enugu-Ezike",
    "Ete",
    "Ikem",
    "Mberubu",
    "Nsukka",
    "Obolo-Eke (1)",
    "Opi",
    "Udi",
  ],
  "Federal Capital Territory": ["Abuja", "Kuje", "Kwali", "Madala"],
  "Gombe State": [
    "Akko",
    "Bara",
    "Billiri",
    "Dadiya",
    "Deba",
    "Dukku",
    "Garko",
    "Gombe",
    "Hinna",
    "Kafarati",
    "Kaltungo",
    "Kumo",
    "Nafada",
    "Pindiga",
  ],
  "Imo State": ["Iho", "Oguta", "Okigwe", "Orlu", "Orodo", "Owerri"],
  "Jigawa State": [
    "Babura",
    "Birnin Kudu",
    "Birniwa",
    "Dutse",
    "Gagarawa",
    "Gumel",
    "Gwaram",
    "Hadejia",
    "Kafin Hausa",
    "Kazaure",
    "Kiyawa",
    "Mallammaduri",
    "Ringim",
    "Samamiya",
  ],
  "Kaduna State": [
    "Anchau",
    "Burumburum",
    "Dutsen Wai",
    "Hunkuyi",
    "Kachia",
    "Kaduna",
    "Kafanchan",
    "Kagoro",
    "Kajuru",
    "Kujama",
    "Lere",
    "Mando",
    "Saminaka",
    "Soba",
    "Sofo-Birnin-Gwari",
    "Zaria",
  ],
  "Kano State": ["Dan Gora", "Gaya", "Kano"],
  "Katsina State": [
    "Danja",
    "Dankama",
    "Daura",
    "Dutsin-Ma",
    "Funtua",
    "Gora",
    "Jibia",
    "Jikamshi",
    "Kankara",
    "Katsina",
    "Mashi",
    "Ruma",
    "Runka",
    "Wagini",
  ],
  "Kebbi State": [
    "Argungu",
    "Bagudo",
    "Bena",
    "Bin Yauri",
    "Birnin Kebbi",
    "Dabai",
    "Dakingari",
    "Gulma",
    "Gwandu",
    "Jega",
    "Kamba",
    "Kangiwa",
    "Kende",
    "Mahuta",
    "Maiyama",
    "Shanga",
    "Wasagu",
    "Zuru",
  ],
  "Kogi State": [
    "Abocho",
    "Adoru",
    "Ankpa",
    "Bugana",
    "Dekina",
    "Egbe",
    "Icheu",
    "Idah",
    "Isanlu-Itedoijowa",
    "Kabba",
    "Koton-Karfe",
    "Lokoja",
    "Ogaminana",
    "Ogurugu",
    "Okene",
  ],
  "Kwara State": [
    "Ajasse Ipo",
    "Bode Saadu",
    "Gwasero",
    "Ilorin",
    "Jebba",
    "Kaiama",
    "Lafiagi",
    "Offa",
    "Okuta",
    "Omu-Aran",
    "Patigi",
    "Suya",
    "Yashikera",
  ],
  "Lagos State": [
    "Apapa",
    "Badagry",
    "Ebute Ikorodu",
    "Ejirin",
    "Epe",
    "Ikeja",
    "Lagos",
    "Lekki",
    "Ikorodu",
    "Ojo",
    "Makoko",
  ],
  "Nasarawa State": ["Buga", "Doma", "Keffi", "Lafia", "Nasarawa", "Wamba"],
  "Niger State": [
    "Auna",
    "Babana",
    "Badeggi",
    "Baro",
    "Bokani",
    "Duku",
    "Ibeto",
    "Konkwesso",
    "Kontagora",
    "Kusheriki",
    "Kuta",
    "Lapai",
    "Minna",
    "New Shagunnu",
    "Suleja",
    "Tegina",
    "Ukata",
    "Wawa",
    "Zungeru",
  ],
  "Ogun State": [
    "Abeokuta",
    "Ado Odo",
    "Idi Iroko",
    "Ifo",
    "Ijebu-Ife",
    "Ijebu-Igbo",
    "Ijebu-Ode",
    "Ilaro",
    "Imeko",
    "Iperu",
    "Isara",
    "Owode",
  ],
  "Ondo State": [
    "Agbabu",
    "Akure",
    "Idanre",
    "Ifon",
    "Ilare",
    "Ode",
    "Ondo",
    "Ore",
    "Owo",
  ],
  "Osun State": [
    "Apomu",
    "Ejigbo",
    "Gbongan",
    "Ijebu-Jesa",
    "Ikire",
    "Ikirun",
    "Ila Orangun",
    "Ile-Ife",
    "Ilesa",
    "Ilobu",
    "Inisa",
    "Iwo",
    "Modakeke",
    "Oke Mesi",
    "Olupona",
    "Osogbo",
    "Otan Ayegbaju",
    "Oyan",
  ],
  "Oyo State": [
    "Ago Are",
    "Alapa",
    "Fiditi",
    "Ibadan",
    "Igbeti",
    "Igbo-Ora",
    "Igboho",
    "Kisi",
    "Lalupon",
    "Ogbomoso",
    "Okeho",
    "Orita Eruwa",
    "Oyo",
    "Saki",
  ],
  "Plateau State": [
    "Amper",
    "Bukuru",
    "Dengi",
    "Jos",
    "Kwolla",
    "Langtang",
    "Pankshin",
    "Panyam",
    "Vom",
    "Yelwa",
  ],
  "Sokoto State": [
    "Binji",
    "Dange",
    "Gandi",
    "Goronyo",
    "Gwadabawa",
    "Illela",
    "Rabah",
    "Sokoto",
    "Tambuwal",
    "Wurno",
  ],
  "Taraba State": [
    "Baissa",
    "Beli",
    "Gassol",
    "Gembu",
    "Ibi",
    "Jalingo",
    "Lau",
    "Mutum Biyu",
    "Riti",
    "Wukari",
  ],
  "Yobe State": [
    "Damaturu",
    "Dankalwa",
    "Dapchi",
    "Daura",
    "Fika",
    "Gashua",
    "Geidam",
    "Goniri",
    "Gorgoram",
    "Gujba",
    "Gwio Kura",
    "Kumagunnam",
    "Lajere",
    "Machina",
    "Nguru",
    "Potiskum",
  ],
  "Zamfara State": [
    "Anka",
    "Dan Sadau",
    "Gummi",
    "Gusau",
    "Kaura Namoda",
    "Kwatarkwashi",
    "Maru",
    "Moriki",
    "Sauri",
    "Tsafe",
  ],
  Rivers: [
    "Port Harcourt",
    "Obio-Akpor",
    "Eleme",
    "Oyigbo",
    "Ikwerre",
    "Emohua",
    "Etche",
    "Gokana",
    "Khana",
    "Tai",
    "Ogu–Bolo",
    "Andoni",
    "Bonny",
    "Degema",
    "Asari-Toru",
    "Akuku-Toru",
    "Okrika",
    "Ahoada East",
    "Ahoada West",
    "Omuma",
    "Ikwerre",
    "Ogba–Egbema–Ndoni",
    "Opobo–Nkoro",
    "Ikwerre",
    "Abua–Odual",
    "Okrika",
    "Oyigbo",
    "Tai",
    "Akuku-Toru",
    "Andoni",
    "Khana",
    "Gokana",
    "Eleme",
    "Obio-Akpor",
    "Port Harcourt",
    "Bonny",
    "Degema",
    "Asari-Toru",
    "Opobo–Nkoro",
    "Ikwerre",
    "Ahoada East",
    "Ahoada West",
    "Omuma",
    "Ogba–Egbema–Ndoni",
    "Abua–Odual",
  ],
};

export const dashboardCard = (data: {amount: number, completedOrders: number}) => [
  {
    title: "Total revenue",
    filter: "1 year",
    amount: data.amount,
    type: "cur",
    icon: ICON.BarChartIcon,
  },
  {
    title: "Completed bookings",
    filter: "Today",
    amount: data.completedOrders,
    icon: ICON.CheckCircleIcon,
  },
];

export const renderCustomerCard = (data: {
  totalOrders: number;
  totalProcessing: number;
  totalAmount: number;
}) => [
  {
    title: "Total number of orders",
    filter: "All Time",
    amount: data.totalOrders,
    icon: ICON.BarChartIcon,
  },
  {
    title: "Orders in progress",
    filter: "All Time",
    amount: data.totalProcessing,
    icon: ICON.LoaderIcon,
  },
  {
    title: "Total Amount Spent",
    filter: "All Time",
    amount: data.totalAmount,
    type: "cur",
    icon: ICON.CheckCircleIcon,
  },
];

export const renderOrderCard = (data: {
  totalPending: number;
  totalCompleted: number;
  totalCanceled: number;
}) => [
  {
    title: "Pending orders",
    filter: "All Time",
    amount: data.totalPending,
    icon: ICON.LoaderIcon,
  },
  {
    title: "Completed orders",
    filter: "All Time",
    amount: data.totalCompleted,
    icon: ICON.CheckCircleIcon,
  },
  {
    title: "Cancelled orders",
    filter: "All Time",
    amount: data.totalCanceled,
    icon: ICON.CloseIcon,
  },
];

export const renderPromotionCard = (data: {
  activePromotion: number;
  allPromotion: number;
  cancelledPromotion: number;
}) => [
  {
    title: "Active promotions",
    filter: "All Time",
    amount: data.activePromotion,
    icon: ICON.LoaderIcon,
  },
  {
    title: "All promotions",
    filter: "All Time",
    amount: data.allPromotion,
    icon: ICON.CheckCircleIcon,
  },
  {
    title: "Cancelled promotions",
    filter: "All Time",
    amount: data.cancelledPromotion,
    icon: ICON.CloseIcon,
  },
];

export const toolbar = {
  options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
  inline: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'],
    bold: { icon: Bold, className: undefined },
    italic: { icon: Italic, className: undefined },
    underline: { icon: Underline, className: undefined },
    strikethrough: { icon: Strikethrough, className: undefined },
    // monospace: { icon: monospace, className: undefined },
    superscript: { icon: Superscript, className: undefined },
    subscript: { icon: Subscript, className: undefined },
  },
  blockType: {
    inDropdown: true,
    options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
  },
  fontSize: {
    icon: FontSizeIcon,
    options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
  },
  fontFamily: {
    options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
  },
  list: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['unordered', 'ordered', 'indent', 'outdent'],
    // unordered: { icon: unordered, className: undefined },
    // ordered: { icon: ordered, className: undefined },
    indent: { icon: Indent, className: undefined },
    outdent: { icon: Outdent, className: undefined },
  },
  textAlign: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['left', 'center', 'right', 'justify'],
    // left: { icon: left, className: undefined },
    // center: { icon: center, className: undefined },
    // right: { icon: right, className: undefined },
    // justify: { icon: justify, className: undefined },
  },
  colorPicker: {
    // icon: color,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    colors: ['rgb(97,189,109)', 'rgb(26,188,156)', 'rgb(84,172,210)', 'rgb(44,130,201)',
      'rgb(147,101,184)', 'rgb(71,85,119)', 'rgb(204,204,204)', 'rgb(65,168,95)', 'rgb(0,168,133)',
      'rgb(61,142,185)', 'rgb(41,105,176)', 'rgb(85,57,130)', 'rgb(40,50,78)', 'rgb(0,0,0)',
      'rgb(247,218,100)', 'rgb(251,160,38)', 'rgb(235,107,86)', 'rgb(226,80,65)', 'rgb(163,143,132)',
      'rgb(239,239,239)', 'rgb(255,255,255)', 'rgb(250,197,28)', 'rgb(243,121,52)', 'rgb(209,72,65)',
      'rgb(184,49,47)', 'rgb(124,112,107)', 'rgb(209,213,216)'],
  },
  link: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    dropdownClassName: undefined,
    showOpenOptionOnHover: true,
    defaultTargetOption: '_self',
    options: ['link', 'unlink'],
    // link: { icon: link, className: undefined },
    // unlink: { icon: unlink, className: undefined },
    linkCallback: undefined
  },
  emoji: {
    // icon: emoji,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    emojis: [
      '😀', '😁', '😂', '😃', '😉', '😋', '😎', '😍', '😗', '🤗', '🤔', '😣', '😫', '😴', '😌', '🤓',
      '😛', '😜', '😠', '😇', '😷', '😈', '👻', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🙈',
      '🙉', '🙊', '👼', '👮', '🕵', '💂', '👳', '🎅', '👸', '👰', '👲', '🙍', '🙇', '🚶', '🏃', '💃',
      '⛷', '🏂', '🏌', '🏄', '🚣', '🏊', '⛹', '🏋', '🚴', '👫', '💪', '👈', '👉', '👉', '👆', '🖕',
      '👇', '🖖', '🤘', '🖐', '👌', '👍', '👎', '✊', '👊', '👏', '🙌', '🙏', '🐵', '🐶', '🐇', '🐥',
      '🐸', '🐌', '🐛', '🐜', '🐝', '🍉', '🍄', '🍔', '🍤', '🍨', '🍪', '🎂', '🍰', '🍾', '🍷', '🍸',
      '🍺', '🌍', '🚑', '⏰', '🌙', '🌝', '🌞', '⭐', '🌟', '🌠', '🌨', '🌩', '⛄', '🔥', '🎄', '🎈',
      '🎉', '🎊', '🎁', '🎗', '🏀', '🏈', '🎲', '🔇', '🔈', '📣', '🔔', '🎵', '🎷', '💰', '🖊', '📅',
      '✅', '❎', '💯',
    ],
  },
  embedded: {
    // icon: embedded,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    embedCallback: undefined,
    defaultSize: {
      height: 'auto',
      width: 'auto',
    },
  },
  image: {
    icon: Image,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    urlEnabled: true,
    uploadEnabled: true,
    alignmentEnabled: true,
    uploadCallback: undefined,
    previewImage: false,
    inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
    alt: { present: false, mandatory: false },
    defaultSize: {
      height: 'auto',
      width: 'auto',
    },
  },
  remove: { icon: Eraser, className: undefined, component: undefined },
  history: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['undo', 'redo'],
    undo: { icon: Undo, className: undefined },
    redo: { icon: Redo, className: undefined },
  },
}

export const deleteHash = {
  "DELETE_EVENTS": deleteEvents,
  // "DELETE_BOOKINGS": deleteOrders,
  // "DELETE_PROMOTIONS": deletePromotions,
}
