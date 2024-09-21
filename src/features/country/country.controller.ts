import { Controller, Get } from "@nestjs/common";
import { CountryService } from "./country.service";
import { Country } from "src/data/models/Country";

@Controller("country")
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get("getCountries")
  async getCountries(): Promise<Country[]> {
    return await this.countryService.getCountries();
  }
}
