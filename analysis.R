# analysis.R av all runs merged in single file
#1 = nej 0 = ja

library(jsonlite)
library(dplyr)

#working directory
setwd("/Users/Lisen/Desktop/data files")

# hämtar csv-filen skapad av cognition.run
raw_data <- read.csv("emoinfo.csv")

# plockar ut alla unika participant idn och lägger i en lista
participants <- unique(raw_data$run_id)

participant_list <- list()

incomplete_ids <- c()

for (id in participants) {
  tryCatch({
    run_id_data <- raw_data[raw_data$run_id == id, ]

    loop_object <- list()

    loop_object$participant_id             <- id
    loop_object$condition                  <- run_id_data$condition[1]
    loop_object$practice_mouselab_display  <- run_id_data$display_order[run_id_data$category == "mouselab_practice"]
    loop_object$practice_mouselab          <- run_id_data$click_log[run_id_data$category == "mouselab_practice"]
    loop_object$practice_credibility       <- run_id_data$response[run_id_data$category == "credibility_practice"]
    loop_object$practice_binary            <- run_id_data$response[run_id_data$category == "binary_practice"]
    loop_object$pre_credibility            <- run_id_data$response[run_id_data$category == "pre_credibility"]
    loop_object$pre_big_q                  <- run_id_data$response[run_id_data$category == "pre_big_q"]
    loop_object$pre_binary                 <- run_id_data$response[run_id_data$category == "pre_binary"]
    loop_object$mouselab_display           <- run_id_data$display_order[run_id_data$category == "mouselab"]
    loop_object$card_order                 <- run_id_data$click_log[run_id_data$category == "mouselab"]
    cl                                     <- fromJSON(run_id_data$click_log[run_id_data$category == "mouselab"])
    loop_object$total_duration             <- sum(cl$duration, na.rm = TRUE)
    for (i in seq_len(nrow(cl))) {
      loop_object[[paste0("card_", i, "_name")]] <- cl$card[i]
      loop_object[[paste0("card_", i, "_time")]] <- cl$duration[i]
    }
    loop_object$mid_credibility            <- run_id_data$mid_credibility[run_id_data$category == "mouselab"]
    loop_object$mid_big_q                  <- run_id_data$mid_big_q[run_id_data$category == "mouselab"]
    loop_object$post_credibility           <- as.numeric(run_id_data$response[run_id_data$category == "post_credibility"])
    loop_object$post_big_q                 <- as.numeric(run_id_data$response[run_id_data$category == "post_big_q"])
    loop_object$post_binary                <- run_id_data$response[run_id_data$category == "post_binary"]
    loop_object$motivation                 <- run_id_data$motivation[run_id_data$category == "motivation"]

    participant_list[[as.character(id)]]   <- as.data.frame(loop_object)

  }, error = function(e) {
    incomplete_ids <<- c(incomplete_ids, id)
  })
}

clean_data      <- bind_rows(participant_list)
data            <- clean_data[order(clean_data$participant_id), ]
data_incomplete <- raw_data[raw_data$run_id %in% incomplete_ids, ]

