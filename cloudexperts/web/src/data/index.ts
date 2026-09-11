import siteData from './data.json'

export type Service = (typeof siteData.services)[number]
export type Technology = (typeof siteData.technologies)[number]
export type Location = (typeof siteData.locations)[number]
export type ProfessionType = (typeof siteData.professionTypes)[number]

export const { services, technologies, locations, professionTypes } = siteData

export default siteData
