<template>
	<div>
		<div
			ref="chartEl"
			class="admin-chart"
		/>
		<div class="row mt-4">
			<div class="col-12">
				<h4>Всего просмотров: {{ totalViews }}</h4>
			</div>
		</div>
	</div>
</template>

<script setup>
import {
	toRefs,
	computed,
	ref,
	onMounted,
	onBeforeUnmount,
} from 'vue';
import ApexCharts from 'apexcharts';

const props = defineProps({
	views: {
		type: Array,
		required: true,
		default: () => [],
	},
});

const { views } = toRefs(props);

// eslint-disable-next-line
const totalViews = computed(() => views.value.reduce((acc, el) => acc += el.y, 0));

const chartOptions = computed(() => {
	const items = [...views.value];

	const options = {
	  chart: {
	    height: 380,
	    width: '100%',
	    type: 'area',
	    animations: {
	      initialAnimation: {
	        enabled: false,
	      },
	    },
	  },
	  series: [
	    {
	      name: 'Количество просмотров новостей',
	      data: items,
	    },
	  ],
	  xaxis: {
	    type: 'datetime',
	    labels: {
       datetimeUTC: false,
	   	},
	  },
	};

	return options;
});

const chartEl = ref(null);

let chart;

const renderChart = () => {
	if (!chartEl.value) return;

	chart = new ApexCharts(chartEl.value, chartOptions.value);
	chart.render();
};

onMounted(renderChart);

onBeforeUnmount(() => {
	chart.destroy();
});
</script>
