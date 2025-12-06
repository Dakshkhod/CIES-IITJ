import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'cies-iitj-cms',
  title: 'CIES IITJ CMS',
  
  projectId: 'py29aahl',
  dataset: 'production',
  
  basePath: '/studio',
  
  plugins: [structureTool()],
  
  schema: {
    types: schemaTypes,
  },
})

