<template>
  <v-card flat>
    <v-footer padless>
      <v-card flat tile width="100%">
        <v-card-text>
          <download-dialog />
          <v-btn icon v-on:click="startDownloadItem([selected])">
            <v-icon>mdi-arrow-down-bold-circle</v-icon>
          </v-btn>
          <v-btn icon v-on:click="deleteDownloadItem([selected])">
            <v-icon>mdi-pause</v-icon>
          </v-btn>
          <v-btn icon v-on:click="pauseDownloadItem([selected])">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-card-text>
      </v-card>
    </v-footer>
    <v-list two-line>
      <template v-for="(item, index) in items">
        <v-list-item :key="item.gid">
          <v-list-item-action>
            <v-checkbox
              v-model="selected"
              :value="item.gid"
              on-icon="mdi-circle"
              off-icon="mdi-circle-outline"
            ></v-checkbox>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title v-text="item.bittorrent.info.name"></v-list-item-title>

            <v-list-item-subtitle
              class="text--primary"
              v-text="resolveState(item)"
            ></v-list-item-subtitle>

            <v-list-item-subtitle>
              <v-progress-linear
                color="teal"
                buffer-value="0"
                :value="0"
              ></v-progress-linear
            ></v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-row>
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on" icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item>
                    <v-btn text v-on:click="startDownloadItem([item.gid])"
                      >Start</v-btn
                    >
                  </v-list-item>
                  <v-list-item>
                    <v-btn text v-on:click="deleteDownloadItem([item.gid])"
                      >Delete</v-btn
                    >
                  </v-list-item>
                  <v-list-item>
                    <v-btn text v-on:click="pauseDownloadItem([item.gid])"
                      >Pause
                    </v-btn>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-row>
          </v-list-item-action>
        </v-list-item>

        <v-divider v-if="index < items.length - 1" :key="index"></v-divider>
      </template>
    </v-list>
  </v-card>
</template>
<script>
import DownloadDialog from "./DownloadDialog.vue";
export default {
  components: { DownloadDialog },
  name: "Download",

  data: () => ({
    sheet: false,
    progressBar: false,
    downloadDialog: false,
    newDownloadItems: "",
    selected: [],
    items: [],
  }),

  mounted() {
    this.loadData();
    const timer = setInterval(this.loadData, 5000);
    this.$once("hook:beforeDestroy", () => {
      clearInterval(timer);
    });
  },

  methods: {
    loadData() {
      this.$axios
        .get("job")
        .then((resp) => {
          this.items = resp.data;
          console.log(this.items)
        })
        .catch(console.error);
    },

    startDownloadItem(ids) {
      console.debug(ids);
    },

    deleteDownloadItem(ids) {
      console.debug(ids);
    },

    pauseDownloadItem(ids) {
      console.debug(ids);
    },

    resolveState(item) {
      return (
        // state.percent.toFixed(2) +
        // "% " +
        this.convertBytes(item.downloadSpeed) +
        "/s " +
        this.convertBytes(item.completedLength) +
        "/" +
        this.convertBytes(item.totalLength)
      );
    },
    convertBytes(bytes) {
      //return bytes
      const units = ["bytes", "KB", "MB", "GB", "TB"];
      var unit = 0;
      var f = parseFloat(bytes)
      while (f > 1024) {
        unit += 1;
        f /= 1024;
      }
      return f.toFixed(2) + units[unit];
    },
  },
};
</script>