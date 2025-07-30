import z from "zod";
import { TextSchema, URLSchema } from "./DataTypes";

export const ThingSchema = z.object({
  additionalType: z.union([
    TextSchema,
    URLSchema
  ]).nullish().describe('An additional type for the item, typically used for adding more specific types from external vocabularies in microdata syntax. This is a relationship between something and a class that the thing is in. Typically the value is a URI-identified RDF class, and in this case corresponds to the use of rdf:type in RDF. Text values can be used sparingly, for cases where useful information can be added without their being an appropriate schema to reference. In the case of text values, the class label should follow the schema.org style guide.'),
  alternateName: TextSchema.nullish().describe('An alias for the item.'),
  description: TextSchema.nullish().describe('A description of the item.'), // or TextObject
  disambiguatingDescription: TextSchema.nullish().describe('A sub property of description. A short description of the item used to disambiguate from other, similar items. Information from other properties (in particular, name) may be necessary for the description to be useful for disambiguation.'),
  identifier: z.union([ // or PropertyValue
    TextSchema,
    URLSchema
  ]).nullish().describe('The identifier property represents any kind of identifier for any kind of Thing, such as ISBNs, GTIN codes, UUIDs etc. Schema.org provides dedicated properties for representing many of these, either as textual strings or as URL (URI) links. See background notes for more details.'),
  image: URLSchema.nullish().describe('An image of the item. This can be a URL or a fully described ImageObject.'), // or ImageObject
  mainEntityOfPage: URLSchema.nullish().describe('Indicates a page (or other CreativeWork) for which this thing is the main entity being described. See background notes for details. Inverse property: mainEntity'), // or CreativeWork
  name: TextSchema.nullish().describe('The name of the item.'),
  // potentialAction
  sameAs: URLSchema.nullish().describe('URL of a reference Web page that unambiguously indicates the item\'s identity. E.g. the URL of the item\'s Wikipedia page, Wikidata entry, or official website.'),
  // subjectOf
  url: URLSchema.nullish().describe('URL of the item.'),
}).describe('The most generic type of item.');