import { Controller, Get, Logger, Query, Res } from "@nestjs/common";
import { CountryService } from "./country.service";
import { Country } from "src/data/models/Country";
import { Response } from "express";
import { RouteService } from "../route/route.service";
import { City } from "src/data/models/City";

const mm = "🚼 🚼 🚼 CountryController 🚼";

@Controller("country")
export class CountryController {
  constructor(private readonly countryService: CountryService) {}
  private readonly logger = new Logger(CountryController.name);

  @Get("getCountries")
  async getCountries(): Promise<Country[]> {
    return await this.countryService.getCountries();
  }
  @Get("getCountryCities")
  async getCountryCities(
    @Query("countryId") countryId: string
  ): Promise<City[]> {
    return await this.countryService.getCountryCities(countryId);
  }

  @Get("getCountryCitiesZippedFile")
  public async getCountryCitiesZippedFile(
    @Query("countryId") countryId: string,
    @Res() res: Response
  ) {
    try {
      const filePath =
        await this.countryService.getCountryCitiesZippedFile(countryId);
      this.sendFile(filePath, res);
    } catch (error) {
      this.logger.error("Error getting countryCities zipped file:", error);
      res.status(500).send("Error downloading file: " + error.message);
    }
  }

  private sendFile(filePath: string, res: Response) {
    this.logger.debug(
      `\n\n${mm} .... 💦💦💦💦💦 sending file ....\n💦💦 path:` + filePath
    );
    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Content-Disposition", `attachment; filename=route.zip`);

    res.sendFile(filePath);
  }
}
