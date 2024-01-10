import sourceData from '@/data.json';

export default (await import('vue')).defineComponent({
data() {
return {
destinations: sourceData.destinatons
};
},
});
