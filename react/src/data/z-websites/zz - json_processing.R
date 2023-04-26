library(rjson)
library(jsonlite)
library(tidyverse)

circles_json <- read_json('./circles.json', simplifyVector = TRUE) %>% as_tibble()

str_circle_json <- circles_json

for(i in (1:8)){
  str_circle_json <- str_circle_json %>%
    mutate(
      !!as.symbol(paste0('discrete_feature_',i)) := as.character(!!as.symbol(paste0('discrete_feature_',i)))
    )
}

jsonData <- toJSON(str_circle_json, auto_unbox = TRUE) # auto_unbox avoids toJSON adding square braquets around each value

write(jsonData, "cicles_string.json")

