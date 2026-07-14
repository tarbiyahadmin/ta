import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const DOCUMENT_TYPES = [
  'siteSettings',
  'homepage',
  'programsPage',
  'programCategory',
  'program',
  'blogPage',
  'blogPost',
  'careersPage',
  'careerRole',
  'donatePage',
  'formPage',
  'thankYouPage',
  'aboutPage',
  'financialAidPage',
]

export default defineConfig({
  name: 'default',
  title: 'Tarbiyah Academy',

  projectId: 'e9zp5jt7',
  dataset: 'production',

  plugins: [
    structureTool({
      name: 'structure',
      title: 'Structure',
      structure: (S) =>
        S.list()
          .title('Content')
          .items(
            S.documentTypeListItems().filter((item) => DOCUMENT_TYPES.includes(item.getId() ?? ''))
          ),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
