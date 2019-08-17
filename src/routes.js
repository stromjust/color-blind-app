import Simulation from './components/Simulation.vue'
import HowToUse from './components/HowToUse.vue'
import HowItWorks from './components/HowItWorks.vue'

export const routes = [
		{ path: '/', component: Simulation, name: "Simulation" },
		{ path: '/how-to-use', component: HowToUse, name: "HowToUse" },
		{ path: '/how-it-works', component: HowItWorks, name: "HowItWorks" }
];
