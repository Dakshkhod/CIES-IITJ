import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemas';

export default defineConfig({
  name: 'cies-iitj-cms',
  title: 'CIES IITJ CMS',

  projectId: 'py29aahl',
  dataset: 'production',

  basePath: '/studio',

  plugins: [
    structureTool({
      structure: S =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Team Management')
              .id('teamManagement')
              .child(S.document().schemaType('teamSettings').documentId('teamSettings')),
            ...S.documentTypeListItems().filter(item => item.getId() !== 'teamSettings'),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
