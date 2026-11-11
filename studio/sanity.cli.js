import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'ugswy94e',
    dataset: 'production',
  },
  deployment: {
    appId: 'ris4bn16lae7i6tz9kysjqm5', // ← Tambahin baris ini
  },
})
