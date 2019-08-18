import Simulation from './components/Simulation.vue'
import HowToUse from './components/HowToUse.vue'
import WhyUseIt from './components/WhyUseIt.vue'
import HowItWorks from './components/HowItWorks.vue'

export const routes = [
		{ path: '/', component: Simulation, name: "Simulation" },
		{ path: '/how-to-use', component: HowToUse, name: "HowToUse" },
		{ path: '/why-use-it', component: WhyUseIt, name: "WhyUseIt" },
		{ path: '/how-it-works', component: HowItWorks, name: "HowItWorks" }
];
