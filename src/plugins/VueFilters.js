import Vue from 'vue'

const formatDate = (currentDate) => {

    let data = new Date(currentDate.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")),
        dia  = data.getDate().toString(),
        diaF = (dia.length === 1) ? '0' + dia : dia,
        mes  = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length === 1) ? '0' + mes : mes,
        anoF = data.getFullYear();

    console.log(data)

    return diaF+"/"+mesF+"/"+anoF
}

const formatPrice = (price) => price.toLocaleString('pt-pt', {minimumFractionDigits: 2})

Vue.filter('dateformat', formatDate)
Vue.filter('priceformat', formatPrice)
