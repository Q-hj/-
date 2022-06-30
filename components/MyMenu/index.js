// /components/index/index.js
Component({
  mixins: [],
  data: {},
  props: { list: [], type: 0 },
  didUpdate(prevProps, prevData) {},
  didMount() {
    // console.log(this.props.list);
  },
  methods: {
    handleTap({ currentTarget }) {
      console.log(currentTarget.dataset.item);
      // 组件传值
    },
  },
});
