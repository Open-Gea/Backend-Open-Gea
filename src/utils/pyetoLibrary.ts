
// Latitude
const MINLAT_RADIANS = deg2rad(-90.0)
const MAXLAT_RADIANS = deg2rad(90.0)
// Solar declination
const MINSOLDEC_RADIANS = deg2rad(-23.5)
const MAXSOLDEC_RADIANS = deg2rad(23.5)

// Sunset hour angle
const MINSHA_RADIANS = 0.0
const MAXSHA_RADIANS = deg2rad(180)

// Solar constant [ MJ m-2 min-1]
const SOLAR_CONSTANT = 0.0820


function checkLatitudeRad(latitude: number): void {
    if (!(MINLAT_RADIANS <= latitude && latitude <= MAXLAT_RADIANS)) {
        throw new Error(`latitude outside valid range ${MINLAT_RADIANS} to ${MAXLAT_RADIANS} rad: ${latitude}`);
    }
}

function check_doy(doy: number): void {

    if (!(1 <= doy && doy <= 366)) {
      throw new Error(`Day of the year (doy) must be in range 1-366: ${doy}`);
    }
}

function check_latitude_rad(latitude: number): void {
    if (!(latitude >= MINLAT_RADIANS && latitude <= MAXLAT_RADIANS)) {

        throw new Error(`latitude outside valid range ${MINLAT_RADIANS} to ${MAXLAT_RADIANS} rad: ${latitude}`);
    }
}

function checkSolDecRad(sd: number): void {

    if (!(MINSOLDEC_RADIANS <= sd && sd <= MAXSOLDEC_RADIANS)) {
        throw new Error(`solar declination outside valid range ${MINSOLDEC_RADIANS} to ${MAXSOLDEC_RADIANS} rad: ${sd}`);
    }
}

function check_sunset_hour_angle_rad(sha: number): void {
    if (!(MINSHA_RADIANS <= sha && sha <= MAXSHA_RADIANS)) {
      throw new Error(`sunset hour angle outside valid range ${MINSHA_RADIANS} to ${MAXSHA_RADIANS} rad: ${sha}`);
    }
  }


export function hargreaves(tmin: number, tmax: number, tmean: number, et_rad: number): number {
    return 0.0023 * (tmean + 17.8) * Math.sqrt(tmax - tmin) * 0.408 * et_rad;
}

export function sunset_hour_angle(latitude: number, sol_dec: number): number {
    check_latitude_rad(latitude);
    check_sol_dec_rad(sol_dec);
    const cos_sha = -Math.tan(latitude) * Math.tan(sol_dec);
    return Math.acos(Math.min(Math.max(cos_sha, -1), 1));
}

export function deg2rad(degrees: number): number {   
    return degrees * (Math.PI / 180.0);
}

export function sol_dec(day_of_year: number): number {
    check_doy(day_of_year);
    return 0.409 * Math.sin((2 * Math.PI * day_of_year / 365) - 1.39);
  }
export function check_sol_dec_rad(sd: number): void {
    if (!(sd >= -0.4102 && sd <= 0.4102)) {
      throw new Error(`solar declination outside valid range ${MINSOLDEC_RADIANS} to ${MAXSOLDEC_RADIANS} rad: ${sd}`);
    }
}

export function et_rad(latitude: number, sol_dec: number, sha: number, ird: number): number {
    checkLatitudeRad(latitude);
    checkSolDecRad(sol_dec);
    check_sunset_hour_angle_rad(sha);
  
    const tmp1 = (24.0 * 60.0) / Math.PI;
    const tmp2 = sha * Math.sin(latitude) * Math.sin(sol_dec);
    const tmp3 = Math.cos(latitude) * Math.cos(sol_dec) * Math.sin(sha);
    return tmp1 * SOLAR_CONSTANT * ird * (tmp2 + tmp3);
}

export function inv_rel_dist_earth_sun(day_of_year: number): number {
    check_doy(day_of_year);
    return 1 + (0.033 * Math.cos((2.0 * Math.PI / 365.0) * day_of_year));
}