import {defineStore} from "pinia";
import {computed, reactive, ref} from "vue";


interface Currency {
  ID: string;
  NumCode: string;
  CharCode: string;
  Nominal: number;
  Name: string;
  Value: number;
  Previous: number;
}

interface Valute {
  [key: string]: Currency;
}

export const useCurrencyStore = defineStore('currency', () => {

  const tariffs = [
    {title: 'simple', month: 100, year: 1000},
    {title: 'pro', month: 150, year: 1400}
  ]

  const valutes = {
    'KZT': 'тенге',
    'CNY': 'юань'
  }

  const errorMessage = ref('')

  const currency = ref({

  }) as Valute

  const discountPrice = ref(0)

  const tariffData = reactive({
    tariffPlan: '',
    currencyType: '',
    period: ''
  })

  const totalSum = ref(0)

  async function getCurrency() {
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js?ID=R01010')
    const data = await response.json()

    currency.value = data.Valute
  }

  function getCurrencyTitle() {
    return `${valutes[tariffData['currencyType']]}`
  }

  function calculateTotalSum() {
    try {
      if(!tariffData.period || !tariffData.tariffPlan || !tariffData.currencyType) throw new Error('error')

      const tariff = tariffs.find(tariffPlane => tariffPlane.title === tariffData['tariffPlan'])

      const valute = selectedCurrency.value.find(selected => selected.CharCode === tariffData.currencyType)

      totalSum.value =  (tariff[tariffData.period] / (valute.Value / valute.Nominal))

      if(tariffData.period === 'year') {
        discountPrice.value =  ((tariff.month / (valute.Value / valute.Nominal)) * 12 - totalSum.value)
      } else {
        discountPrice.value = 0
      }
      errorMessage.value = ''
    } catch {
      errorMessage.value = 'Выберите все опции'
    }

  }

  const roundTotalSum = computed(() => {
    return `${totalSum.value.toFixed()} ${getCurrencyTitle()}`
  })

  const roundDiscountPrice = computed(() => {
    return `${discountPrice.value.toFixed()} ${getCurrencyTitle()}`
  })

  const selectedCurrency = computed(() => {
    return [currency.value['KZT'], currency.value['CNY']]
  })

  return {
    currency,
    getCurrency,
    selectedCurrency,
    tariffData,
    totalSum,
    calculateTotalSum,
    discountPrice,
    errorMessage,
    roundTotalSum,
    roundDiscountPrice
  }
})