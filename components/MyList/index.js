// /components/index/index.js
Component({
  mixins: [],
  data: { y: 2 },
  props: { list: [] },
  didUpdate(prevProps, prevData) {},
  didMount() {
    console.log(this.props.list);
  },
  methods: {},
});
