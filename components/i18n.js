export default function i18n(str) {
  return(
    str
    //countries tr encode
    .replace("USA","ABD")
    .replace("Spain","İspanya")
    .replace("Italy","İtalya")
    .replace("France","Fransa")
    .replace("Iran, Islamic Republic of","İran")
    .replace("China","Çin")
    .replace("Germany","Almanya")
    .replace("United Kingdom","Birleşik Krallık")
    .replace("Turkey","Türkiye")
    .replace("asd","asd")
  )
}