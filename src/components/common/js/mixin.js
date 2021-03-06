import {mapGetters, mapMutations,mapActions} from "vuex";



export const playlistMixin={
    computed:{
        ...mapGetters([
            'playList'
        ])

    },
    mounted () {
        this.handlePlaylist(this.playlist)
    },
    activated () {
        this.handlePlaylist(this.playlist)
    },
    watch: {
        playlist (newVal) {
            this.handlePlaylist(newVal)
        }
    },
    methods: {
        handlePlaylist() {
            throw new Error('component must implement handlePlaylist method')
        }
    }
}

export const searchMixin ={
    data(){
        return{
            query:''
        }
    },
    computed: {
        ...mapGetters([
            'searchHistory'
            ]
        )

    },
    methods: {
        onQueryChange(query) {
            this.query =query
        },
        addQuery(query){
            this.$refs.searchBox.setQuery(query)
        },
        saveSearch(){
            this.saveSearchHistory(this.query)
        },
        ...mapActions([
            'saveSearchHistory',
            'deleteSearchHistory',
            'clearSearchHistory'
        ])

    }
}
