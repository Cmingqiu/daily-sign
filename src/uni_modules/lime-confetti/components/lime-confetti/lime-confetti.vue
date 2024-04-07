<template>
	<demo-block title="彩纸礼炮">
		<view style="height: 750rpx;">
			<l-confetti ref="confettiRef" @done="done"></l-confetti>
		</view>
		<button @click="run1">basice cannon</button>
		<button @click="run2">Random Direction</button>
		<button @click="run3">Realistic Look</button>
		<button @click="run4">Stars</button>
		<button @click="run5">Fireworks</button>
		<button @click="run6">Snow</button>
		<button @click="run7">School Pride</button>
	</demo-block>
</template>
<script>
	import {ref, onMounted, defineComponent } from '../l-confetti/vue';
	export default defineComponent({
		setup() {
			const confettiRef = ref(null);
			
			const done = () => {
				console.log('礼炮播放完毕')
			}
			const run1 = () => {
				confettiRef.value.play({
					particleCount: 100,
					spread: 70,
					shapes: ['circle'],
					origin: {
						y: 0.6
					}
				})
			}
			
			
			const run2 = () => {
				function randomInRange(min, max) {
					return Math.random() * (max - min) + min;
				}
				confettiRef.value.play({
					angle: randomInRange(55, 125),
					spread: randomInRange(50, 70),
					particleCount: randomInRange(50, 100),
					origin: {
						y: 0.6
					}
				})
			}
			
			
			
			function fire(particleRatio, opts) {
				const count = 200;
				const defaults = {
					origin: {
						y: 0.7
					}
				};
				return (Object.assign({}, defaults, opts, {
					particleCount: Math.floor(count * particleRatio)
				}));
			}
			
			const run3 = () => {
				const fire1 = fire(0.25, {
					spread: 26,
					startVelocity: 55,
				});
				const fire2 = fire(0.2, {
					spread: 60,
				});
				const fire3 = fire(0.35, {
					spread: 100,
					decay: 0.91,
					scalar: 0.8
				});
				const fire4 = fire(0.1, {
					spread: 120,
					startVelocity: 25,
					decay: 0.92,
					scalar: 1.2
				});
				const fire5 = fire(0.1, {
					spread: 120,
					startVelocity: 45,
				});
				confettiRef.value.play(fire3);
			}
			
			const run4 = () => {
				const defaults = {
					spread: 360,
					ticks: 50,
					gravity: 0,
					decay: 0.94,
					startVelocity: 30,
					shapes: ['star'],
					colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8']
				};
			
				function shoot() {
					confettiRef.value.play({
						...defaults,
						particleCount: 40,
						scalar: 1.2,
						shapes: ['star']
					});
			
					confettiRef.value.play({
						...defaults,
						particleCount: 10,
						scalar: 0.85,
						shapes: ['circle']
					});
				}
				setTimeout(shoot, 0);
				setTimeout(shoot, 100);
				setTimeout(shoot, 200);
			}
			
			
			const run5 = () => {
				const duration = 15 * 1000;
				const animationEnd = Date.now() + duration;
				const defaults = {
					startVelocity: 30,
					spread: 360,
					ticks: 60,
					zIndex: 0
				};
			
				function randomInRange(min, max) {
					return Math.random() * (max - min) + min;
				}
			
				const interval = setInterval(function() {
					const timeLeft = animationEnd - Date.now();
			
					if (timeLeft <= 0) {
						return clearInterval(interval);
					}
			
					const particleCount = 50 * (timeLeft / duration);
					// since particles fall down, start a bit higher than random
					confettiRef.value.play(Object.assign({}, defaults, {
						particleCount,
						origin: {
							x: randomInRange(0.1, 0.3),
							y: Math.random() - 0.2
						}
					}));
					confettiRef.value.play(Object.assign({}, defaults, {
						particleCount,
						origin: {
							x: randomInRange(0.7, 0.9),
							y: Math.random() - 0.2
						}
					}));
				}, 250);
			}
			
			
			const run6 = () => {
				let duration = 15 * 1000;
				let animationEnd = Date.now() + duration;
				let skew = 1;
			
				function randomInRange(min, max) {
					return Math.random() * (max - min) + min;
				}
			
				(function frame() {
					let timeLeft = animationEnd - Date.now();
					let ticks = Math.max(200, 500 * (timeLeft / duration));
					skew = Math.max(0.8, skew - 0.001);
			
					confettiRef.value.play({
						particleCount: 1,
						startVelocity: 0,
						ticks: ticks,
						origin: {
							x: Math.random(),
							// since particles fall down, skew start toward the top
							y: (Math.random() * skew) - 0.2
						},
						colors: ['#bb0000'],
						shapes: ['circle'],
						gravity: randomInRange(0.4, 0.6),
						scalar: randomInRange(0.4, 1),
						drift: randomInRange(-0.4, 0.4)
					});
			
					if (timeLeft > 0) {
						setTimeout(frame, 100);
					}
				}());
			}
			
			const run7 = () => {
				const end = Date.now() + (15 * 1000);
			
				// go Buckeyes!
				const colors = ['#bb0000', '#ffffff'];
			
				(function frame() {
					confettiRef.value.play({
						particleCount: 2,
						angle: 60,
						spread: 55,
						origin: {
							x: 0
						},
						colors: colors
					});
					confettiRef.value.play({
						particleCount: 2,
						angle: 120,
						spread: 55,
						origin: {
							x: 1
						},
						colors: colors
					});
			
					if (Date.now() < end) {
						setTimeout(frame, 1000/30);
					}
				}());
			}
			
			
			return {
				confettiRef,
				done,
				run1,
				run2,
				run3,
				run4,
				run5,
				run6,
				run7,
			}
		}
	})
</script>
<style>
</style>